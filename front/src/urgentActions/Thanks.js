import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';
import SharingScreen from '../themes/Sharing/SharingScreen';

import generateUrl from '../services/generateUrl';

export const Thanks = ({ slug, data, actions }) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    const share = get(data, 'share');

    if (share) {
        const sharingLink = `${global.origin}/#${generateUrl('ua', { slug })}`;
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
    slug: PropTypes.string.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        link: LinkType,
    }),
    actions: PropTypes.func,
};

Thanks.defaultProps = {
    actions: () => {},
};

export default Thanks;
