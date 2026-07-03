const tags = ["span", "i", "b", "strong", "em"] as const;

type TagName = (typeof tags)[number];

const rand = (n: number) => (Math.random() * n) | 0;
const randTag = () => tags[rand(tags.length)];
const randChar = () => "abcdefghijklmnopqrstuvwxyz"[rand(26)];
const randWord = (len = 6) => Array.from({ length: len }, randChar).join("");

export function obfuscateEmail(email: string) {
    const className = randWord();
    const tagCount: Partial<Record<TagName, number>> = {};
    const tagsToHide: Partial<Record<TagName, number[]>> = {};

    let html = "";
    for (const char of email) {
        const entity = `&#${char.charCodeAt(0)};`;

        if (Math.random() < 0.7) {
            const tag = randTag();
            tagCount[tag] = (tagCount[tag] ?? 0) + 1;
            html += `<${tag}>${entity}</${tag}>`;
        } else {
            html += entity;
        }

        if (Math.random() < 0.7) html += `<!-- ${randWord()} -->`;

        if (Math.random() < 0.7) {
            const tag = randTag();
            tagCount[tag] = (tagCount[tag] ?? 0) + 1;
            (tagsToHide[tag] ??= []).push(tagCount[tag]);
            html += `<${tag}>${randChar()}</${tag}>`;
        }
    }

    const hideSelectors = Object.entries(tagsToHide).flatMap(([tag, positions]) =>
        positions.map((n) => `.${className}>${tag}:nth-of-type(${n})`),
    );

    const css = [
        `.${className} b,.${className} strong{font-weight:normal;}`,
        hideSelectors.length > 0 ? `${hideSelectors.join(",")}{display:none;}` : "",
    ].join("");

    return { className, html, css };
}
