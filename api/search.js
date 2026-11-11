// Song search for the guess field: GET /api/search?q=...  ->  { songs: [{ title, artist }], from: { itunes, deezer, us } }
//
// The browser used to ask the iTunes catalog itself. iTunes answers about 20 searches a minute from one address and
// refuses the rest (403), and on Israeli mobile networks many phones share one address, so players often got nothing.
// This search runs on the server instead:
//  - It asks the iTunes catalog (Israeli store) and Deezer at the same time. iTunes ranks best and comes first; Deezer
//    is far more generous with searches and knows Hebrew well, so when iTunes refuses, Deezer's songs still come back.
//    A search in Latin letters that the Israeli store answers with few songs also asks the American store.
//  - Vercel's CDN keeps each answer: a day when every source answered, ten minutes when one of them failed. The many
//    players who type the same thing ("עומר אדם") ask the catalogs only once.
//  - When every source fails the answer is an error (503) that is never kept, and the page falls back to asking iTunes
//    itself, as before.
// Only the search text is passed on, as it was when the browser asked iTunes. Nothing else is stored or logged here.

const TIMEOUT_MS = 4000;
const LIMIT = 50;
const MAX_SONGS = 60;
const HE = /[֐-׿]/;

// the query as the page sends it (index.html does the same, so one search is one cached answer)
const normQuery = (q) => String(q || '').toLowerCase().replace(/\s+/g, ' ').slice(0, 80).trim();

// names compared without case, accents, Hebrew points, apostrophes and punctuation
const norm = (s) => String(s).toLowerCase().normalize('NFD')
  .replace(/[̀-֑ͯ-ׇ]/g, '')
  .replace(/['’‘`׳]/g, '')
  .replace(/[^\p{L}\p{N}\s]/gu, ' ')
  .replace(/\s+/g, ' ').trim();
const stripExtras = (s) => String(s).replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/\s[-–]\s.*$/, '');   // "(Live)", "- Remastered"

async function getJson(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error('status ' + r.status);
  return r.json();
}

async function itunes(country, q) {
  const d = await getJson(`https://itunes.apple.com/search?media=music&entity=song&limit=${LIMIT}&country=${country}&term=${encodeURIComponent(q)}`);
  return (d.results || []).filter((x) => x && x.trackName && x.artistName).map((x) => ({ title: x.trackName, artist: x.artistName }));
}

async function deezer(q) {
  const d = await getJson(`https://api.deezer.com/search?limit=${LIMIT}&q=${encodeURIComponent(q)}`);
  if (d.error) throw new Error('deezer ' + (d.error.code || d.error.type || 'error'));   // over quota comes back as 200 with an error
  const songs = (d.data || []).filter((x) => x && x.title && x.artist && x.artist.name).map((x) => ({ title: x.title, artist: x.artist.name }));
  // Deezer also brings loose matches ("ריטה" finds "ריטלין"): songs whose names start the words typed come first
  const words = norm(q).split(' ').filter(Boolean);
  const score = (s) => { const have = norm(s.title + ' ' + s.artist).split(' '); return words.filter((w) => have.some((h) => h.startsWith(w))).length; };
  return songs.map((s, i) => ({ s, i, k: score(s) })).sort((a, b) => b.k - a.k || a.i - b.i).map((x) => x.s);
}

const settle = (p) => p.then((value) => ({ ok: true, value }), (error) => ({ ok: false, error }));

async function search(q) {
  const [il, dz] = await Promise.all([settle(itunes('il', q)), settle(deezer(q))]);
  let us = null;                                    // only for Latin letters, when the Israeli store answered with few songs
  if (!HE.test(q) && il.ok && il.value.length < 10) us = await settle(itunes('us', q));
  const sources = [il, dz, us].filter(Boolean);
  // one row per song: "Bohemian Rhapsody (Live in Budapest)" and "Bohemian Rhapsody" are the same song, and the plain
  // name is the one kept, in the place where the song first came
  const at = new Map(), songs = [];
  const plain = (s) => stripExtras(s.title).trim() === s.title.trim();
  for (const src of sources) {
    if (!src.ok) continue;
    for (const s of src.value) {
      const key = norm(stripExtras(s.title)) + '|' + norm(s.artist);
      if (!at.has(key)) { at.set(key, songs.length); songs.push(s); }
      else if (plain(s) && !plain(songs[at.get(key)])) songs[at.get(key)] = s;
    }
  }
  const state = (src) => (!src ? 'skipped' : src.ok ? 'ok' : 'failed');
  return {
    songs: songs.slice(0, MAX_SONGS),
    from: { itunes: state(il), deezer: state(dz), us: state(us) },
    answered: sources.some((s) => s.ok),
    complete: sources.every((s) => s.ok),
  };
}

function send(res, status, cache, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', cache);
  res.end(JSON.stringify(body));
}

async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'no-store', { error: 'GET only' });
  const q = normQuery(new URL(req.url, 'http://localhost').searchParams.get('q'));
  if (q.length < 2) return send(res, 400, 'no-store', { error: 'query too short' });
  const r = await search(q);
  if (!r.answered) return send(res, 503, 'no-store', { songs: [], from: r.from });
  const keep = r.complete ? 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    : 'public, max-age=60, s-maxage=600';
  return send(res, 200, keep, { songs: r.songs, from: r.from });
}

module.exports = handler;
module.exports.normQuery = normQuery;
