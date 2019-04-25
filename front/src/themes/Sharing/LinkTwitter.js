import React from 'react';
import PropTypes from 'prop-types';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import ShareLink from './ShareLink';

export const LinkTwitter = ({ text, action }) => (
    <ShareLink
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="twitter"
        title="Partage Twitter"
        icon={faTwitter}
        text="Envoyer le tweet"
        action={action}
        bigSize={true}
        customClass="twitter-share-button"
    />
);

LinkTwitter.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
};

LinkTwitter.defaultProps = {
    text: '',
    action: () => {},
};

export default LinkTwitter;
