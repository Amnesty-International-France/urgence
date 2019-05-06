import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import TransitionScreen from '../themes/TransitionScreen';

export const ThankStep = ({ data, actions }) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    return <TransitionScreen actions={actions} title={title} message={text} />;
};

ThankStep.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }),
    actions: PropTypes.func,
};

ThankStep.defaultProps = {
    actions: () => {},
};

export default ThankStep;
