import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

export const LinkFacebook = ({ slug, step, url, action, analyticsCategory }) => (
    <ShareLink
        slug={slug}
        step={step}
        href={`fb-messenger://share/?link=${url}`}
        target="facebook"
        title="Partage Messenger"
        icon={faFacebookMessenger}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Messenger"
    />
);

LinkFacebook.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    url: PropTypes.string.isRequired,
    action: PropTypes.func,
    analyticsCategory: PropTypes.string,
};

LinkFacebook.defaultProps = {
    url: '',
    action: () => {},
};

export default LinkFacebook;
