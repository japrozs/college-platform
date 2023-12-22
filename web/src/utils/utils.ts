export const toTitleCase = (text: string) =>
    text.replace(
        /(\w)(\w*)/g,
        (_, firstChar, rest) => firstChar + rest.toLowerCase()
    );
