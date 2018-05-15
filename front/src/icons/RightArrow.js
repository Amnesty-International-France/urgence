import React from 'react';
import PropTypes from 'prop-types';

import RightArrowIcon from './rightArrow.svg';

export const RightArrow = ({ color, size }) => (
    <RightArrowIcon
        fill={color}
        width={size}
        height={size}
        viewBox={`0 0 ${size * 1.5} ${size * 1.5}`}
    />
);

RightArrow.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};

RightArrow.defaultProps = {
    size: 32,
};

export default RightArrow;
