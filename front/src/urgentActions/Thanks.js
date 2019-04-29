import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';
import SharingScreen from '../themes/Sharing/SharingScreen';

export const Thanks = ({ data, actions, auId }) => {
    const share = get(data, 'share');
    if (share) {
        return (
            <SharingScreen
                title={get(data, 'title')}
                message={get(data, 'text')}
                share={get(data, 'share')}
                auId={auId}
            />
        );
    }
    return (
        <TransitionScreen
            actions={actions}
            title={get(data, 'title')}
            message={get(data, 'text')}
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
