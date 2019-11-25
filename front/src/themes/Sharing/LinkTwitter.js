import React from 'react';
import PropTypes from 'prop-types';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import ShareLink from './ShareLink';

export const LinkTwitter = ({ slug, step, text, action, analyticsCategory }) => (
    <ShareLink
        slug={slug}
        step={step}
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="twitter"
        title="Partage Twitter"
        icon={faTwitter}
        action={action}
        customClass="twitter-share-button"
        inLine
        analyticsCategory={analyticsCategory}
        buttonName="Tweeter"
        backgroundColor="#4CAAEA"
    />
);

LinkTwitter.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
    analyticsCategory: PropTypes.string,
};

LinkTwitter.defaultProps = {
    text: '',
    action: () => {},
};

export default LinkTwitter;
