export const templateToBodyText = (template, civility, surname, name) =>
    template
        .map(({ value }) => value.trim())
        .join('\n\n')
        .concat(surname && name ? `\n\n${surname} ${name}` : '');
