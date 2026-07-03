export const getFormatDateString = (lang: string) => {
    return (date: Date) => date.toLocaleDateString(lang, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
};

export const getFormatMonthYearString = (lang: string) => {
    const formatMonth = new Intl.DateTimeFormat(lang, {
        month: "short",
        timeZone: "UTC",
    });

    return (date: Date) =>
        `${formatMonth.format(date)} ${date.getUTCFullYear()}`;
};

export const parseUTCDateString = (date: string) => {
    const [year, month, day = 1] = date.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};
