/** Primary — bottom-left crop, one step before too large. */
export const MANIFESTO_PRIMARY = {
  id: "ru-oni",
  text: "ОНИ",
  className:
    "left-[-26%] bottom-[-20%] sm:left-[-20%] sm:bottom-[-22%] lg:left-[-17%] lg:bottom-[-24%]",
  size: "clamp(11rem, 58vw, 38rem)",
  letterSpacing: 0.012,
} as const;

/** Black mass — upper-right counterweight, aligned to ~62% field split. */
export const MANIFESTO_BLACK_MASS = {
  className:
    "left-[57%] top-[3%] h-[52%] w-[30%] max-w-[9.5rem] sm:left-[59%] sm:top-[5%] sm:h-[48%] sm:w-[26%] sm:max-w-none lg:left-[61%] lg:top-[7%] lg:h-[46%] lg:w-[22%]",
} as const;

export const MANIFESTO_REVEAL_DURATION = 0.52;

export const MANIFESTO_PARALLAX = { x: 5, y: 3 } as const;

export const MANIFESTO_MASS_PARALLAX = { x: 3, y: 2 } as const;

export const MANIFESTO_TYPO_DRIFT = {
  letterSpacing: 0.032,
  scaleX: 0.022,
} as const;
