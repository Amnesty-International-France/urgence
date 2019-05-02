import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

function SEO({ title, description, lang, extraMeta, keywords }) {
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
    ]
        .concat(
            keywords.length > 0
                ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                  }
                : [],
        )
        .concat(extraMeta);

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${title}`}
            meta={meta}
        />
    );
}

SEO.defaultProps = {
    lang: `fr`,
    meta: [],
    keywords: [],
};

SEO.propTypes = {
    lang: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    extraMeta: PropTypes.arrayOf(PropTypes.object),
    keywords: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
