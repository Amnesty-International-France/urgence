import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';

const Act = ({ data, actions }) => (
    <TransitionScreen
        actions={actions}
        title={get(data, 'title')}
        message={get(data, 'message')}
        link={get(data, 'link.url')}
    />
);

Act.propTypes = {
    actions: PropTypes.func,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        link: LinkType,
    }),
};

Act.defaultProps = {
    actions: () => {},
};

export default Act;
