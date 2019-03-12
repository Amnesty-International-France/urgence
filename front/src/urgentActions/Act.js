import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';

const Act = ({ callToAction, action }) => (
    <TransitionScreen
        action={action}
        title={get(callToAction, 'title')}
        message={get(callToAction, 'message')}
        link={get(callToAction, 'link.url')}
    />
);

Act.propTypes = {
    action: PropTypes.element,
    callToAction: PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        link: LinkType,
    }),
};

export default Act;
