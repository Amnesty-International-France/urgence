import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';

export const Thanks = ({ data, actions }) => (
    <TransitionScreen
        actions={actions}
        title={get(data, 'title')}
        message={get(data, 'text')}
        link={get(data, 'link.url')}
    />
);

Thanks.propTypes = {
    actions: PropTypes.element,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        link: LinkType,
    }),
};

Thanks.defaultProps = {
    actions: () => {},
};

export default Thanks;
