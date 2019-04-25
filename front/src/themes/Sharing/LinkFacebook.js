import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

export const LinkFacebook = ({ url, action }) => (
    <ShareLink
        href={`https://facebook.com/sharer/sharer.php?u=${url}`}
        target="facebook"
        title="Partage facebook"
        icon={faFacebook}
        text="Partager sur facebook"
        action={action}
        customClass="fb-share-button"
        customScript={
            <script
                async
                defer
                crossOrigin="anonymous"
                src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.2"
            />
        }
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
