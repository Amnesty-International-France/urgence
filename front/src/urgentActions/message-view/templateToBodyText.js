export const templateToBodyText = (template, civility, firstname, lastname) =>
    template
        .map(({ value }) => value.trim())
        .join('\n\n')
        .concat(firstname && lastname ? `\n\n${firstname} ${lastname}` : '');
