import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import SharingScreen from '../themes/Sharing/SharingScreen';

import generateUrl from '../services/generateUrl';

export const ShareStep = ({ slug, data }) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    const share = get(data, 'share');

    const sharingLink = `${global.origin}/#${generateUrl('ua', { slug })}`;
    return <SharingScreen title={title} message={text} share={share} link={sharingLink} />;
};

ShareStep.propTypes = {
    slug: PropTypes.string.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        share: PropTypes.object,
    }),
    actions: PropTypes.func,
};

ShareStep.defaultProps = {
    actions: () => {},
};

export default ShareStep;
