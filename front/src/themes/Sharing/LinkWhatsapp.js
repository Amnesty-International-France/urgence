import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const LinkWhatsapp = ({ slug, step, text, action, analyticsCategory }) => (
    <ShareLink
        slug={slug}
        step={step}
        href={`whatsapp://send?text=${text}`}
        target="whatsapp"
        title="Partage Whatsapp"
        icon={faWhatsapp}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Whatsapp"
    />
);

LinkWhatsapp.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
    analyticsCategory: PropTypes.string,
};

LinkWhatsapp.defaultProps = {
    text: '',
    action: () => {},
};

export default LinkWhatsapp;
