export const templateToBodyText = (template, civility, surname, name) =>
    template
        .map(({ value }) => value.trim())
        .join('\n\n')
        .concat(civility && surname && name ? `\n\n${civility}${surname}${name}` : '');
