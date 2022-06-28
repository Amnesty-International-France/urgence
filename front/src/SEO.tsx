import React from 'react';
import { Helmet } from 'react-helmet-async';

export type SEOProps = {
    siteName: string;
    url: string;
    lang: string;
    socialMetadata?: any;
};

const SEO = ({ socialMetadata, lang, url, siteName }: SEOProps) => {
    const title = socialMetadata.title || 'Action urgente';
    const description = socialMetadata.description || 'Action urgente';
    const meta = [
        {
            name: `description`,
            content: description,
        },
        {
            property: `og:title`,
            content: title,
        },
        {
            property: `og:description`,
            content: description,
        },
        {
            property: `og:type`,
            content: `website`,
        },
        {
            property: `og:url`,
            content: url,
        },
        {
            property: `og:site_name`,
            content: siteName,
        },

        {
            name: `twitter:card`,
            content: `summary`,
        },
        {
            name: `twitter:title`,
            content: title,
        },
        {
            name: `twitter:description`,
            content: description,
        },

        {
            name: `twitter:url`,
            content: url,
        },
    ];

    if (socialMetadata.medium && socialMetadata.medium.src) {
        meta.push(
            {
                name: `twitter:image`,
                content: socialMetadata.medium.src,
            },
            {
                property: `og:image`,
                content: socialMetadata.medium.src,
            },
        );
    }

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | Réaction Rapide`}
            meta={meta}
        />
    );
};

SEO.defaultProps = {
    siteName: 'Réaction Rapide',
    url: global.origin,
    lang: `fr`,
};

export default SEO;
