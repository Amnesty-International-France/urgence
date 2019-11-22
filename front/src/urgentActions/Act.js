import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { withBlackLogo } from '../themes/ThemeContext';
import TransitionScreen from '../themes/TransitionScreen';

const Act = ({ data, actions }) => (
    <TransitionScreen actions={actions} title={get(data, 'title')} message={get(data, 'message')} />
);

Act.propTypes = {
    actions: PropTypes.func,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }),
};

Act.defaultProps = {
    actions: () => {},
};

export default withBlackLogo(Act);
