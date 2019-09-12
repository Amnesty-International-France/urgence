import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import SharingScreen from './SharingScreen';

import generateUrl from '../../services/generateUrl';

const Share = ({ slug, step, data, analyticsCategory }) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    const share = get(data, 'share');

    const sharingLink = `${global.origin}/${generateUrl('ua', { slug })}`;
    return (
        <SharingScreen
            slug={slug}
            step={step}
            title={title}
            message={text}
            share={share}
            link={sharingLink}
            analyticsCategory={analyticsCategory}
        />
    );
};

Share.propTypes = {
    slug: PropTypes.string.isRequired,
    step: PropTypes.string,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        share: PropTypes.object,
    }),
    analyticsCategory: PropTypes.string,
    actions: PropTypes.func,
};

Share.defaultProps = {
    actions: () => {},
    slug: 'new-ua',
};

export default Share;
