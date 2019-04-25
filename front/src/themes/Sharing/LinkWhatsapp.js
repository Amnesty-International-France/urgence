import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const LinkWhatsapp = ({ text, action }) => (
    <ShareLink
        href={`whatsapp://send?text=${text}`}
        target="whatsapp"
        title="Partage Whatsapp"
        icon={faWhatsapp}
        text="Partager avec whatsapp"
        action={action}
    />
);

LinkWhatsapp.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
};

LinkWhatsapp.defaultProps = {
    text: '',
    action: () => {},
};

export default LinkWhatsapp;
