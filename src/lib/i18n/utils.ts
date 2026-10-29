import {
    languages,
    languageCodes,
    defaultLang,
    type LanguageCode,
} from "@i18n/langs";
import { SHOW_DEFAULT_LANG } from "@/consts";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
    return `${basePath}${path}`;
}

function withoutBase(url: URL): string {
    return url.pathname.slice(basePath.length) || "/";
}

export function isLanguageCode(value: string): value is LanguageCode {
    return value in languages;
}

export function getLangFromUrl(url: URL): LanguageCode {
    const [, lang] = withoutBase(url).split("/");
    if (isLanguageCode(lang)) return lang;
    return defaultLang;
}

export function getUrlWithoutLang(url: URL): string {
    const pathname = withoutBase(url);
    const [, lang, ...rest] = pathname.split("/");
    if (!isLanguageCode(lang)) return pathname;

    const path = `/${rest.join("/")}`;
    return path === "/" ? path : path.replace(/\/$/, "");
}

export function useTranslatedPath(lang: LanguageCode) {
    return function translatePath(path: string, l: LanguageCode = lang) {
        return withBase(!SHOW_DEFAULT_LANG && l === defaultLang ? path : `/${l}${path}`);
    };
}

export const getStaticPaths = () =>
    languageCodes.map((lang) => ({ params: { lang } }));
