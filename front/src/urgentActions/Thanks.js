import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';

export const Thanks = ({ data, actions, auId }) => {
    return (
        <TransitionScreen
            actions={actions}
            title={get(data, 'title')}
            message={get(data, 'text')}
            link={get(data, 'link.url')}
            share={get(data, 'share')}
            auId={auId}
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
