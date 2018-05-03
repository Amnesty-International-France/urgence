export const templateToBodyText = (template, signature) =>
    template
        .map(({ value }) => value.trim())
        .join('\n\n')
        .concat(`\n\n${signature}`);
