import { getUrgentActionBySlug } from './repository';

export const getMetaDataTemplateBySlug = async (slug?: string) => {
    console.log('getMetaDataTemplateBySlug');
    if (!slug) {
        return null;
    }

    const urgentAction = await getUrgentActionBySlug(slug);
    if (!urgentAction) {
        return null;
    }

    const socialMetadata = urgentAction.social_metadata;
    if (!socialMetadata) {
        return null;
    }

    const html = `
    <html lang="fr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <title>${socialMetadata.title}</title>
            <meta name="description" content="${socialMetadata.description}">
            <meta property="og:title" content="${socialMetadata.title}">
            <meta property="og:description" content="${socialMetadata.description}">
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://urgent.amnesty.com">
            <meta property="og:site_name" content="${socialMetadata.title}">
            <meta name="twitter:card" content="summary">
            <meta name="twitter:title" content="${socialMetadata.title}">
            <meta name="twitter:description" content="${socialMetadata.description}" >
            <meta name="twitter:url" content="https://urgent.amnesty.com">
            <meta name="twitter:image" content="${socialMetadata.medium.src}">
            <meta property="og:image" content="${socialMetadata.medium.src}">
        </head>
        <body></body>
    </html>
    `;

    return html;
};
