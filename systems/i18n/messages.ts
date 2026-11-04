export type Locale = "en" | "ru";

// Brandbook prose is translated from the original Russian copy, not rewritten.
const pairs: readonly (readonly [string, string])[] = [
  ["HOME", "ГЛАВНАЯ"], ["PROJECTS", "ПРОЕКТЫ"], ["CASES", "КЕЙСЫ"],
  ["ARCHIVE", "АРХИВ"], ["WORKS", "РАБОТЫ"], ["BRANDBOOK", "БРЕНДБУК"],
  ["CONTACT", "КОНТАКТЫ"], ["MENU", "МЕНЮ"], ["CLOSE", "ЗАКРЫТЬ"],
  ["Open menu", "Открыть меню"], ["Close menu", "Закрыть меню"],
  ["Go to homepage", "На главную"], ["Site navigation", "Навигация по сайту"],
  ["Primary navigation", "Основная навигация"], ["Footer navigation", "Навигация в подвале"],
  ["3D. Motion. Web.", "3D. Моушн. Веб."],
  ["A visual studio and creative collective specializing in 3D, motion, web development and digital design.", "Визуальная студия и творческий коллектив: 3D, моушн, веб-разработка и digital-дизайн."],
  ["Loading scene…", "Загрузка сцены…"], ["View Projects", "Смотреть проекты"],
  ["SELECTED PROJECTS", "ИЗБРАННЫЕ ПРОЕКТЫ"], ["ONI Brandbook", "Брендбук ONI"],
  ["Identity, type and motion.", "Айдентика, типографика и движение."],
  ["Let's", "Давайте"], ["Work", "работать"], ["Together", "вместе"],
  ["Tell us about your project.", "Расскажите о вашем проекте."],
  ["SHOWREEL", "ШОУРИЛ"], ["Close", "Закрыть"],
  ["Open showreel", "Открыть шоу-рил"], ["Close showreel", "Закрыть шоу-рил"],
  ["ONI showreel", "Шоу-рил ONI"], ["ONI studio showreel", "Шоу-рил студии ONI"],
  ["ONI showreel installation", "Шоу-рил ONI"],
  ["Event / Clubshow Design", "Дизайн ивентов и клубных шоу"],
  ["3D / Motion", "3D / Моушн"],
  ["Automotive renders, abstract motion and chrome studies.", "Автомобильные рендеры, абстрактный моушн и эксперименты с хромом."],
  ["Vertical 3D Animation", "Вертикальная 3D-анимация"],
  ["Short-form 3D animation and character studies.", "Короткие 3D-анимации и эксперименты с персонажами."],
  ["Digital Fashion", "Цифровая мода"],
  ["Fashion films, digital garments and short-form visual experiments.", "Фэшн-фильмы, цифровая одежда и короткие визуальные эксперименты."],
  ["Poster Design", "Дизайн постеров"], ["Graphic and animated posters.", "Графические и анимированные постеры."],
  ["Automotive", "Автомобильный рендер"], ["Chrome", "Хром"], ["Head Study", "Этюд головы"],
  ["Stories", "Сторис"], ["Reel", "Рилс"], ["Fashion Horror", "Фэшн-хоррор"],
  ["Boots", "Ботинки"], ["Digital Streetwear", "Цифровой стритвир"],
  ["Poster Study", "Постерный этюд"], ["Motion Poster", "Моушн-постер"],
  ["COVER", "ОБЛОЖКА"], ["INTRO", "ВСТУПЛЕНИЕ"], ["ABOUT", "О ПРОЕКТЕ"],
  ["LOGO", "ЛОГО"], ["COLORS", "ЦВЕТА"], ["FONTS", "ШРИФТЫ"], ["LINKS", "ССЫЛКИ"],
  ["ONI (ОНИ)\nA visual studio specializing in 3D, development, motion and digital design.", "ONI (ОНИ)\nВизуальная студия, специализирующаяся на 3D, разработке, моушне и digital-дизайне."],
  ["We create visuals that capture attention: 3D animations, event artwork, posters and creative work for brands, artists and projects.", "Создаём визуалы, которые цепляют: 3D анимации, афиши, постеры и креатив для брендов, артистов и проектов."],
  ["A fast pace and unconventional challenges.\nWe can work from a finished brief or develop a concept with you, even if the idea is still only in your head.", "Быстрый темп и нестандартные задачи.\nМожем работать по готовому брифу или собрать концепт вместе с вами, если идеи пока только в голове."],
  ["One line. Six figures. One circle.", "Одна линия. Шесть фигур. Один круг."],
  ["The logo has no beginning or end: everyone is connected. Just like our work: the artist's idea, the designer's hand and the developer's mind are all part of one process.", "В логотипе нет ни начала, ни конца — все соединены друг с другом. Так же, как в работе: идея художника, рука дизайнера, голова разработчика — всё это один процесс."],
  ["Apart, they are lines.\nTogether, they form an image.", "По отдельности — линии.\nВместе — образ."],
  ["ONI means us. And those alongside us.", "ОНИ — это мы. И те, с кем мы рядом."],
  ["MONOSPACE / BODY", "МОНОШИРИННЫЙ / ТЕКСТ"], ["DISPLAY / HEADINGS", "АКЦИДЕНТНЫЙ / ЗАГОЛОВКИ"],
  ["Spatial Identity", "Пространственная айдентика"], ["System Architectures", "Архитектура систем"],
  ["Editorial Motion", "Редакционный моушн"], ["Experimental Media", "Экспериментальные медиа"],
  ["Archive Research", "Архивные исследования"], ["Atmospheric Fragments", "Атмосферные фрагменты"],
  ["← Archive", "← Архив"], ["← Works", "← Работы"], ["ONI — Work", "ONI — Проект"],
  ["ONI — Archive", "ONI — Архив"], ["ONI — Works", "ONI — Работы"], ["objects", "объектов"], ["works", "работ"],
  ["plates", "изображений"], ["SPATIAL", "ПРОСТРАНСТВО"], ["MOTION", "МОУШН"],
  ["IDENTITY", "АЙДЕНТИКА"], ["TECHNICAL", "ТЕХНОЛОГИИ"], ["EDITORIAL", "РЕДАКЦИОННЫЙ"], ["EXPERIMENTAL", "ЭКСПЕРИМЕНТЫ"],
  ["TECHNICAL · SPATIAL", "ТЕХНОЛОГИИ · ПРОСТРАНСТВО"],
  ["Automation platforms and editorial infrastructure — studio systems authored as resolved output, not supporting material.", "Платформы автоматизации и редакционная инфраструктура — самостоятельные студийные проекты, а не вспомогательные материалы."],
  ["CASE STUDIES · 2026", "КЕЙСЫ · 2026"], ["PARTY", "ВЕЧЕРИНКА"], ["WATCH FULL →", "СМОТРЕТЬ КЕЙС →"],
  ["Club event identity — Murmansk, 2026.", "Айдентика клубного события — Мурманск, 2026."],
  ["Club event identity", "Айдентика клубного события"], ["Brand colours", "Цвета бренда"],
  ["BRAND", "АЙДЕНТИКА"], ["ARTIST", "АРТИСТ"], ["POSTERS", "ПОСТЕРЫ"], ["MERCH", "МЕРЧ"],
  ["STICKERS", "СТИКЕРЫ"], ["END", "ФИНАЛ"], ["08 — END", "08 — ФИНАЛ"],
  ["Event Branding", "Брендинг события"], ["Visual Identity", "Визуальная айдентика"],
  ["Merch", "Мерч"], ["Posters", "Постеры"], ["BRAND IDENTITY", "АЙДЕНТИКА БРЕНДА"],
  ["Headliner", "Хедлайнер"], ["Uniforms & print", "Одежда и печать"],
  ["Murmansk · 1700 guests", "Мурманск · 1700 гостей"], ["SWIPE →", "ЛИСТАТЬ →"],
  ["Print & digital", "Печатные и цифровые материалы"], ["ALL CASES", "ВСЕ КЕЙСЫ"], ["ALL CASES →", "ВСЕ КЕЙСЫ →"],
  ["Created by ONI Studio · 2026", "Создано студией ONI · 2026"], ["CREATED BY ONI STUDIO · 2026", "СОЗДАНО СТУДИЕЙ ONI · 2026"],
  ["COLOURS", "ЦВЕТА"], ["SECTION 04 / BRAND COLOURS", "РАЗДЕЛ 04 / ЦВЕТА БРЕНДА"],
  ["Every colour carries weight: purple is night and excess, anthracite is concrete and grit, mist is smoke before dawn.", "Каждый цвет выбран с весом: фиолетовый — ночь и избыток, антрацит — бетон и грязь, туман — дым перед рассветом."],
  ["SECTION 06 / DIGITAL", "РАЗДЕЛ 06 / ЦИФРОВЫЕ МАТЕРИАЛЫ"], ["DIGITAL &", "ЦИФРОВЫЕ"], ["SOCIAL", "МЕДИА"],
  ["Telegram announcements, social banners and digital assets carry the same energy as the printed materials.", "Telegram-анонсы, социальные баннеры и диджитал-ассеты — с той же энергией, что и в печатных материалах."],
];

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
const messages = new Map<string, readonly [string, string]>();
for (const pair of pairs) {
  messages.set(normalize(pair[0]), pair);
  messages.set(normalize(pair[1]), pair);
}

export function translate(value: string, locale: Locale): string {
  const message = messages.get(normalize(value));
  if (!message) return value;
  const leading = value.match(/^[ \t\u00a0]+/)?.[0] ?? "";
  const trailing = value.match(/[ \t\u00a0]+$/)?.[0] ?? "";
  return leading + message[locale === "en" ? 0 : 1] + trailing;
}

export function hasTranslation(value: string): boolean {
  return messages.has(normalize(value));
}
