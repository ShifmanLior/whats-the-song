// רשימת השירים של "מה השיר?"
//
// השיר של כל יום נקבע לפי הסדר ברשימה: היום הראשון (31.10.2026) הוא השיר הראשון,
// היום השני הוא השני, וכן הלאה. אחרי השיר האחרון הרשימה חוזרת להתחלה.
// כדי לא לשבור את הסדר של ימים שכבר היו, הוסיפו שירים חדשים רק בסוף הרשימה.
//
// שדות:
//   id         מזהה הסרטון ביוטיוב (החלק אחרי v= בקישור)
//   title      שם השיר, כפי שיוצג בסיום המשחק
//   artist     שם האמן
//   start      (לא חובה) שנייה שממנה מתחילים, למקרה שבסרטון יש פתיח לפני השיר
//   artistAlt  (לא חובה) איות נוסף של שם האמן, בעיקר באנגלית לאמנים ישראלים
//   titleAlt   (לא חובה) איות נוסף של שם השיר, בעיקר תעתיק באנגלית לשירים בעברית
//
// ניחוש נחשב נכון כשהוא מכיל את שם השיר (או אחד מהאיותים הנוספים) יחד עם שם האמן.
// כשכותבים רק את שם השיר בלי האמן, חייבים להקליד אותו במלואו.
// קטלוג iTunes מחזיר שמות אמנים ושירים ישראליים לפעמים בעברית ולפעמים באנגלית, ולכן
// בשירים בעברית כדאי למלא את שני השדות האחרונים.
//
// לפני שמוסיפים שיר, כדאי לוודא שהסרטון ניתן להטמעה:
//   curl -s -o /dev/null -w "%{http_code}" "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID"
// קוד 200 אומר שאפשר, 401 אומר שהבעלים חסם הטמעה.
window.SONGS = [
  { id: "7CTJcHjkq0E", title: "Billie Jean", artist: "Michael Jackson" },
  { id: "gP6PS-poyMg", title: "אני ואתה", artist: "אריק איינשטיין", artistAlt: ["Arik Einstein"], titleAlt: ["Ani Veata", "Ani Ve Ata", "Ani V'eAta"] },
  { id: "dLl4PZtxia8", title: "Hotel California", artist: "Eagles" },
  { id: "IOSmBOsGRMc", title: "רכבת לילה לקהיר", artist: "משינה", artistAlt: ["Mashina"], titleAlt: ["Rakevet Layla", "Rakevet Laila", "Night Train to Cairo"] },
  { id: "_dK2tDK9grQ", title: "Shape of You", artist: "Ed Sheeran" },
  { id: "IUxt7faTExY", title: "ירושלים של זהב", artist: "שולי נתן", artistAlt: ["Shuli Natan", "Shuly Nathan", "Shuli Nathan"], titleAlt: ["Yerushalayim Shel Zahav", "Jerusalem of Gold"] },
  { id: "bDtjO-R0QSo", title: "Rolling in the Deep", artist: "Adele" },
  { id: "PctzQsrVkPs", title: "Toy", artist: "נטע ברזילי", artistAlt: ["Netta", "Netta Barzilai"] },
  { id: "7Ya2U8XN_Zw", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
  { id: "oXFOcWfHGyc", title: "לבכות לך", artist: "אביב גפן", artistAlt: ["Aviv Geffen", "Aviv Gefen"], titleAlt: ["Livkot Lecha", "Livkot Lach", "Livkot Lekha"] },
  { id: "fJ9rUzIMcZQ", title: "Bohemian Rhapsody", artist: "Queen" },
  { id: "MMICmo6Hj0k", title: "הללויה", artist: "גלי עטרי", artistAlt: ["Gali Atari", "Milk and Honey"], titleAlt: ["Hallelujah", "Halleluyah"] },
  { id: "MIgK3zOk0zg", title: "Take On Me", artist: "a-ha" },
  // היום ה-56 (25.12.2026) נופל על המקום הזה ברשימה
  { id: "bXlk2q_kt3I", title: "All I Want for Christmas Is You", artist: "Mariah Carey" },
  { id: "fHI8X4OXluQ", title: "Blinding Lights", artist: "The Weeknd" },
  { id: "ZRnzTTYk7_Q", title: "אם נין עלו", artist: "עופרה חזה", artistAlt: ["Ofra Haza"], titleAlt: ["Im Nin Alu", "Im Nin'alu", "Im Ninalu"] },
  { id: "mQER0A0ej0M", title: "Hey Jude", artist: "The Beatles" },
  { id: "WZM4iXT3-ic", title: "עטור מצחך", artist: "אריק איינשטיין", artistAlt: ["Arik Einstein"], titleAlt: ["Atur Mitzchech", "Atur Mitzhech"] },
  { id: "FVdjZYfDuLE", title: "Wonderwall", artist: "Oasis" },
  { id: "r4wbdKmM3bQ", title: "Unicorn", artist: "נועה קירל", artistAlt: ["Noa Kirel"] },
  { id: "-sVB91NTa4A", title: "Dancing Queen", artist: "ABBA" },
  { id: "kmW2yAYhMmM", title: "ממעמקים", artist: "עידן רייכל", artistAlt: ["Idan Raichel", "Idan Rachel"], titleAlt: ["Mimaamakim", "Mima Amakim", "Mima'amakim"] },
  { id: "dvgZkm1xWPE", title: "Viva la Vida", artist: "Coldplay" },
  { id: "vcpgpEUlKfk", title: "הפרח בגני", artist: "זוהר ארגוב", artistAlt: ["Zohar Argov"], titleAlt: ["Haperach Begani", "Ha Perach Be Gani", "Perach Begani"] },
  { id: "NlK9u6a69Dg", title: "Bad Romance", artist: "Lady Gaga" },
  { id: "CWkdudLsoPY", title: "ילד מזדקן", artist: "כוורת", artistAlt: ["Kaveret", "Poogy"], titleAlt: ["Yeled Mezdaken"] },
  { id: "TP_eAvRXtpM", title: "Africa", artist: "Toto" },
  { id: "Y_OLslE3bX8", title: "טודו בום", artist: "סטטיק ובן אל תבורי", artistAlt: ["Static", "Ben El", "Static and Ben El"], titleAlt: ["Tudo Bom"] },
  { id: "hTWKbfoikeg", title: "Smells Like Teen Spirit", artist: "Nirvana" },
  { id: "02uV8M6XSto", title: "האהבה הישנה", artist: "שלמה ארצי", artistAlt: ["Shlomo Artzi"], titleAlt: ["Haahava Hayeshana", "Ha Ahava Ha Yeshana"] },
  { id: "4m1EFMoRFvY", title: "Single Ladies (Put a Ring on It)", artist: "Beyoncé" },
  { id: "lJYn09tuPw4", title: "Hurricane", artist: "עדן גולן", artistAlt: ["Eden Golan"] },
  { id: "5NV6Rdv1a3I", title: "Get Lucky", artist: "Daft Punk" },
  { id: "NsPksS8QWWY", title: "Diva", artist: "דנה אינטרנשיונל", artistAlt: ["Dana International"], titleAlt: ["דיווה"] },
  { id: "QkF3oxziUI4", title: "Stairway to Heaven", artist: "Led Zeppelin" },
  { id: "CvBfHwUxHIk", title: "Umbrella", artist: "Rihanna" },
  { id: "8UVNT4wvIGY", title: "Somebody That I Used to Know", artist: "Gotye" },
  { id: "nfWlot6h_JM", title: "Shake It Off", artist: "Taylor Swift" },
  { id: "id2-K3daNRQ", title: "I Wanna Dance with Somebody", artist: "Whitney Houston" },
  { id: "fEfvTTJNeAY", title: "...Baby One More Time", artist: "Britney Spears" },
  { id: "gB9P0kpc1O4", title: "In the End", artist: "Linkin Park" },
  { id: "QflL6R2-k-8", title: "שירת הסטיקר", artist: "הדג נחש", artistAlt: ["Hadag Nahash", "Hadag Nachash"], titleAlt: ["Shirat Hasticker", "Shirat Hastiker", "The Sticker Song", "Sticker Song"] }
];
