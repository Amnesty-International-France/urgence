import React from 'react';
import PropTypes from 'prop-types';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

import ShareLink from './ShareLink';

export const LinkFacebook = ({ slug, step, url, action, analyticsCategory }) => (
    <ShareLink
        slug={slug}
        step={step}
        href={`fb-messenger://share/?link=${url}`}
        target="facebook"
        title="Partage Facebook"
        icon={faFacebookF}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Messenger"
        backgroundColor="#4267b2"
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
