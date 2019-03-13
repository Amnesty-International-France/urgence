import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';

export const Thanks = ({ data, action }) => (
    <TransitionScreen
        action={action}
        title={get(data, 'title')}
        message={get(data, 'text')}
        link={get(data, 'link.url')}
    />
);

Thanks.propTypes = {
    action: PropTypes.element,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        link: LinkType,
    }),
};

Thanks.defaultProps = {
    actions: () => {},
};

export default Thanks;
