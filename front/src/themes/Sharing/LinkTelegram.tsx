import React from 'react';
import PropTypes from 'prop-types';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

import ShareLink from './ShareLink';

export const LinkTelegram = ({ slug, step, url, action, analyticsCategory }) => (
    <ShareLink
        slug={slug}
        step={step}
        href={url}
        target="telegram"
        title="Join telegram"
        icon={faTelegram}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Telegram"
        backgroundColor="#0088cc"
    />
);

LinkTelegram.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    url: PropTypes.string.isRequired,
    action: PropTypes.func,
    analyticsCategory: PropTypes.string,
};

LinkTelegram.defaultProps = {
    url: '',
    action: () => {},
};

export default LinkTelegram;
