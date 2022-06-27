import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Helmet from 'react-helmet';

type OwnProps = {
    siteName: string;
    url: string;
    lang: string;
    socialMetadata?: any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof SEO.defaultProps;

// @ts-expect-error TS(7022): 'SEO' implicitly has type 'any' because it does no... Remove this comment to see the full error message
const SEO = ({ socialMetadata, lang, url, siteName }: Props) => {
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
