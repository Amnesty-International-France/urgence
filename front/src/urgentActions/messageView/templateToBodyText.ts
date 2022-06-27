export const templateToBodyText = (template: any, civility: any, firstname: any, lastname: any) =>
    template
        .map(({ value }: any) => value.trim())
        .join('\n\n')
        .concat(firstname && lastname ? `\n\n${firstname} ${lastname}` : '');
