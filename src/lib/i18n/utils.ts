import {
    languages,
    languageCodes,
    defaultLang,
    type LanguageCode,
} from "@i18n/langs";
import { SHOW_DEFAULT_LANG } from "@/consts";

export function isLanguageCode(value: string): value is LanguageCode {
    return value in languages;
}

export function getLangFromUrl(url: URL): LanguageCode {
    const [, lang] = url.pathname.split("/");
    if (isLanguageCode(lang)) return lang;
    return defaultLang;
}

export function getUrlWithoutLang(url: URL): string {
    const [, lang, ...rest] = url.pathname.split("/");
    if (!isLanguageCode(lang)) return url.pathname;

    const path = `/${rest.join("/")}`;
    return path === "/" ? path : path.replace(/\/$/, "");
}

export function useTranslatedPath(lang: LanguageCode) {
    return function translatePath(path: string, l: LanguageCode = lang) {
        return !SHOW_DEFAULT_LANG && l === defaultLang ? path : `/${l}${path}`;
    };
}

export const getStaticPaths = () =>
    languageCodes.map((lang) => ({ params: { lang } }));
