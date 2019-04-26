import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

export const LinkFacebook = ({ url, action }) => (
    <ShareLink
        href={`fb-messenger://share/?link=${encodeURIComponent(url)}`}
        target="facebook"
        title="Partage Messenger"
        icon={faFacebookMessenger}
        text="Partager sur Messenger"
        action={action}
    />
);

LinkFacebook.propTypes = {
    url: PropTypes.string.isRequired,
    action: PropTypes.func,
};

LinkFacebook.defaultProps = {
    url: '',
    action: () => {},
};

export default LinkFacebook;
