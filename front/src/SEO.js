import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const SEO = ({ title, description, url, siteName, lang, extraMeta, keywords }) => {
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
        ...(keywords.length > 0
            ? {
                  name: `keywords`,
                  content: keywords.join(`, `),
              }
            : []),
        ...extraMeta,
    ];

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
    extraMeta: [],
    keywords: [],
};

SEO.propTypes = {
    siteName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    extraMeta: PropTypes.arrayOf(PropTypes.object),
    keywords: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
