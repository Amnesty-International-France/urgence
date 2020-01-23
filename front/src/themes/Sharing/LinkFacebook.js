import React from 'react';
import PropTypes from 'prop-types';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

import ShareLink from './ShareLink';

export const LinkFacebook = ({ slug, step, url, action, analyticsCategory }) => (
    <ShareLink
        slug={slug}
        step={step}
        href={`fb-messenger://share/?link=${url}`}
        target="facebook"
        title="Partage Facebook Messenger"
        icon={faFacebookMessenger}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Messenger"
        backgroundColor="#017efe"
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
