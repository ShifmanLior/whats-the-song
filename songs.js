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
//   artistAlt  (לא חובה) איותים נוספים של שם האמן: באנגלית לאמנים ישראלים, ובעברית לאמנים מחו"ל
//   titleAlt   (לא חובה) איותים נוספים של שם השיר: תעתיק באנגלית לשירים בעברית, ותעתיק בעברית לשירים באנגלית
//
// ניחוש נחשב נכון כשהוא מכיל את שם השיר (או אחד מהאיותים הנוספים) יחד עם שם האמן.
// כשכותבים רק את שם השיר בלי האמן, חייבים להקליד אותו במלואו.
// הבדיקה סלחנית לטעויות איות קטנות, ובעברית גם לאותיות מלאות וחסרות (בילי / ביילי, ג'ין / גין).
// תעתיק שונה לגמרי לא יזוהה לבד, ולכן בכל שיר באנגלית כדאי להוסיף את האיות הנפוץ בעברית,
// ובכל שיר בעברית את האיות הנפוץ באנגלית. קטלוג iTunes מחזיר שמות אמנים ושירים ישראליים
// לפעמים בעברית ולפעמים באנגלית, ולכן בשירים בעברית חשוב למלא את שני השדות.
//
// לפני שמוסיפים שיר, כדאי לוודא שהסרטון ניתן להטמעה:
//   curl -s -o /dev/null -w "%{http_code}" "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID"
// קוד 200 אומר שאפשר, 401 אומר שהבעלים חסם הטמעה.
window.SONGS = [
  { id: "7CTJcHjkq0E", title: "Billie Jean", artist: "Michael Jackson", artistAlt: ["מייקל ג'קסון", "מיכאל ג'קסון"], titleAlt: ["בילי ג'ין", "ביילי ג'ין"] },
  { id: "gP6PS-poyMg", title: "אני ואתה", artist: "אריק איינשטיין", artistAlt: ["Arik Einstein"], titleAlt: ["Ani Veata", "Ani Ve Ata", "Ani V'eAta", "אני ואתה נשנה את העולם"] },
  { id: "dLl4PZtxia8", title: "Hotel California", artist: "Eagles", artistAlt: ["איגלס", "הנשרים"], titleAlt: ["הוטל קליפורניה", "מלון קליפורניה"] },
  { id: "IOSmBOsGRMc", title: "רכבת לילה לקהיר", artist: "משינה", artistAlt: ["Mashina"], titleAlt: ["Rakevet Layla", "Rakevet Laila", "Night Train to Cairo"] },
  { id: "_dK2tDK9grQ", title: "Shape of You", artist: "Ed Sheeran", artistAlt: ["אד שירן", "אד שירין"], titleAlt: ["שייפ אוף יו", "שייפ אוב יו"] },
  { id: "IUxt7faTExY", title: "ירושלים של זהב", artist: "שולי נתן", artistAlt: ["Shuli Natan", "Shuly Nathan", "Shuli Nathan"], titleAlt: ["Yerushalayim Shel Zahav", "Jerusalem of Gold"] },
  { id: "bDtjO-R0QSo", title: "Rolling in the Deep", artist: "Adele", artistAlt: ["אדל"], titleAlt: ["רולינג אין דה דיפ"] },
  { id: "PctzQsrVkPs", title: "Toy", artist: "נטע ברזילי", artistAlt: ["Netta", "Netta Barzilai"], titleAlt: ["טוי"] },
  { id: "7Ya2U8XN_Zw", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", artistAlt: ["מארק רונסון", "מרק רונסון", "ברונו מארס", "ברונו מרס"], titleAlt: ["אפטאון פאנק", "אפטאון פנק"] },
  { id: "oXFOcWfHGyc", title: "לבכות לך", artist: "אביב גפן", artistAlt: ["Aviv Geffen", "Aviv Gefen"], titleAlt: ["Livkot Lecha", "Livkot Lach", "Livkot Lekha"] },
  { id: "fJ9rUzIMcZQ", title: "Bohemian Rhapsody", artist: "Queen", artistAlt: ["קווין"], titleAlt: ["בוהמיין רפסודי", "בוהמיאן ראפסודי"] },
  { id: "MMICmo6Hj0k", title: "הללויה", artist: "גלי עטרי", artistAlt: ["Gali Atari", "Milk and Honey"], titleAlt: ["Hallelujah", "Halleluyah"] },
  { id: "MIgK3zOk0zg", title: "Take On Me", artist: "a-ha", artistAlt: ["אה-הא", "אהא"], titleAlt: ["טייק און מי"] },
  // היום ה-56 (25.12.2026) נופל על המקום הזה ברשימה
  { id: "bXlk2q_kt3I", title: "All I Want for Christmas Is You", artist: "Mariah Carey", artistAlt: ["מריה קארי", "מראיה קארי"], titleAlt: ["אול איי וונט פור כריסטמס איז יו", "אול איי וואנט פור קריסמס איז יו"] },
  { id: "fHI8X4OXluQ", title: "Blinding Lights", artist: "The Weeknd", artistAlt: ["ויקנד", "דה וויקנד"], titleAlt: ["בלינדינג לייטס", "בליינדינג לייטס"] },
  { id: "ZRnzTTYk7_Q", title: "אם נין עלו", artist: "עופרה חזה", artistAlt: ["Ofra Haza"], titleAlt: ["Im Nin Alu", "Im Nin'alu", "Im Ninalu"] },
  { id: "mQER0A0ej0M", title: "Hey Jude", artist: "The Beatles", artistAlt: ["הביטלס", "ביטלס"], titleAlt: ["היי ג'וד", "הי ג'וד"] },
  { id: "WZM4iXT3-ic", title: "עטור מצחך", artist: "אריק איינשטיין", artistAlt: ["Arik Einstein"], titleAlt: ["Atur Mitzchech", "Atur Mitzhech"] },
  { id: "FVdjZYfDuLE", title: "Wonderwall", artist: "Oasis", artistAlt: ["אואזיס", "אואסיס"], titleAlt: ["וונדרוול", "וואנדרוול"] },
  { id: "r4wbdKmM3bQ", title: "Unicorn", artist: "נועה קירל", artistAlt: ["Noa Kirel"], titleAlt: ["יוניקורן"] },
  { id: "-sVB91NTa4A", title: "Dancing Queen", artist: "ABBA", artistAlt: ["אבא"], titleAlt: ["דאנסינג קווין", "דנסינג קווין"] },
  { id: "kmW2yAYhMmM", title: "ממעמקים", artist: "עידן רייכל", artistAlt: ["Idan Raichel", "Idan Rachel"], titleAlt: ["Mimaamakim", "Mima Amakim", "Mima'amakim"] },
  { id: "dvgZkm1xWPE", title: "Viva la Vida", artist: "Coldplay", artistAlt: ["קולדפליי", "קולד פליי"], titleAlt: ["ויוה לה וידה", "ויבה לה ויבה"] },
  { id: "vcpgpEUlKfk", title: "הפרח בגני", artist: "זוהר ארגוב", artistAlt: ["Zohar Argov"], titleAlt: ["Haperach Begani", "Ha Perach Be Gani", "Perach Begani"] },
  { id: "NlK9u6a69Dg", title: "Bad Romance", artist: "Lady Gaga", artistAlt: ["ליידי גאגא", "לידי גאגא"], titleAlt: ["בד רומאנס", "באד רומנס"] },
  { id: "CWkdudLsoPY", title: "ילד מזדקן", artist: "כוורת", artistAlt: ["Kaveret", "Poogy"], titleAlt: ["Yeled Mezdaken"] },
  { id: "TP_eAvRXtpM", title: "Africa", artist: "Toto", artistAlt: ["טוטו"], titleAlt: ["אפריקה"] },
  { id: "Y_OLslE3bX8", title: "טודו בום", artist: "סטטיק ובן אל תבורי", artistAlt: ["Static", "Ben El", "Static and Ben El"], titleAlt: ["Tudo Bom"] },
  { id: "hTWKbfoikeg", title: "Smells Like Teen Spirit", artist: "Nirvana", artistAlt: ["נירוונה", "נירוואנה"], titleAlt: ["סמלס לייק טין ספיריט", "סמלס לייק טין ספירט"] },
  { id: "02uV8M6XSto", title: "האהבה הישנה", artist: "שלמה ארצי", artistAlt: ["Shlomo Artzi"], titleAlt: ["Haahava Hayeshana", "Ha Ahava Ha Yeshana"] },
  { id: "4m1EFMoRFvY", title: "Single Ladies (Put a Ring on It)", artist: "Beyoncé", artistAlt: ["ביונסה", "ביונסי"], titleAlt: ["סינגל ליידיס", "סינגל לידיז"] },
  { id: "lJYn09tuPw4", title: "Hurricane", artist: "עדן גולן", artistAlt: ["Eden Golan"], titleAlt: ["הוריקן", "הוריקיין"] },
  { id: "5NV6Rdv1a3I", title: "Get Lucky", artist: "Daft Punk", artistAlt: ["דפט פאנק", "דאפט פאנק"], titleAlt: ["גט לאקי"] },
  { id: "NsPksS8QWWY", title: "Diva", artist: "דנה אינטרנשיונל", artistAlt: ["Dana International"], titleAlt: ["דיווה", "דיוה", "דיבה"] },
  { id: "QkF3oxziUI4", title: "Stairway to Heaven", artist: "Led Zeppelin", artistAlt: ["לד זפלין", "לד צפלין"], titleAlt: ["סטיירווי טו הבן", "סטירווי טו הבן", "מדרגות לשמיים"] },
  { id: "CvBfHwUxHIk", title: "Umbrella", artist: "Rihanna", artistAlt: ["ריהאנה", "רהאנה"], titleAlt: ["אמברלה", "אומברלה", "מטרייה"] },
  { id: "8UVNT4wvIGY", title: "Somebody That I Used to Know", artist: "Gotye", artistAlt: ["גוטיה", "גוטייה"], titleAlt: ["סמבודי דאט איי יוזד טו נואו", "סמבדי דאט איי יוזד טו נו"] },
  { id: "nfWlot6h_JM", title: "Shake It Off", artist: "Taylor Swift", artistAlt: ["טיילור סוויפט", "טיילור סויפט"], titleAlt: ["שייק איט אוף"] },
  { id: "id2-K3daNRQ", title: "I Wanna Dance with Somebody", artist: "Whitney Houston", artistAlt: ["וויטני יוסטון", "ויטני יוסטון"], titleAlt: ["איי וונה דאנס ויט סמבודי", "איי וואנה דאנס וויד סמבדי"] },
  { id: "fEfvTTJNeAY", title: "...Baby One More Time", artist: "Britney Spears", artistAlt: ["בריטני ספירס"], titleAlt: ["בייבי וואן מור טיים", "בייבי ואן מור טיים"] },
  { id: "gB9P0kpc1O4", title: "In the End", artist: "Linkin Park", artistAlt: ["לינקין פארק", "לינקין פרק"], titleAlt: ["אין דה אנד", "אין די אנד"] },
  { id: "QflL6R2-k-8", title: "שירת הסטיקר", artist: "הדג נחש", artistAlt: ["Hadag Nahash", "Hadag Nachash"], titleAlt: ["Shirat Hasticker", "Shirat Hastiker", "The Sticker Song", "Sticker Song"] }
];
