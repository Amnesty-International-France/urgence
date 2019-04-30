import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';
import SharingScreen from '../themes/Sharing/SharingScreen';

import generateUrl from '../services/generateUrl';

export const Thanks = ({ data, actions }) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    const share = get(data, 'share');

    if (share) {
        const sharingLink = generateUrl('ua', { slug: get(data, 'slug') });
        return <SharingScreen title={title} message={text} share={share} link={sharingLink} />;
    }
    return (
        <TransitionScreen
            actions={actions}
            title={title}
            message={text}
            link={get(data, 'link.url')}
        />
    );
};

Thanks.propTypes = {
    actions: PropTypes.func,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        link: LinkType,
    }),
    auId: PropTypes.string,
};

Thanks.defaultProps = {
    actions: () => {},
};

export default Thanks;
