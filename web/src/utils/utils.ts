import sanitizeHTML from "sanitize-html";

export const toTitleCase = (text: string) =>
    text.replace(
        /(\w)(\w*)/g,
        (_, firstChar, rest) => firstChar + rest.toLowerCase()
    );

export const formatText = (str: string) => {
    str = sanitizeHTML(str);
    str = str?.replace(/(www|http:|https:)+[^\s]+[\w]/g, (t) => {
        console.log("link ::", t);

        return `<a href="${t}" class="text-blue-500 hover:underline"  target="_blank">${t}</a>`;
    });

    // match tildes/backticks(`) - (code)
    console.log(str);
    str = str?.replace(/`(.*?)`/g, (t) => {
        console.log("code in tilde ::", t);
        return `<code>${t.substring(1, t.length - 1)}</code>`;
    });
    return str;
};
