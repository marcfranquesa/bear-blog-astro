export const languages = {
    en: "english",
    ca: "català",
} as const;

export type LanguageCode = keyof typeof languages;

export const languageCodes = Object.keys(languages) as [
    LanguageCode,
    ...LanguageCode[],
];

export const defaultLang: LanguageCode = "en";
