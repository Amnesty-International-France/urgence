export const templateToBodyText = template =>
    template.map(({ value }) => value.trim()).join('\n\n');
