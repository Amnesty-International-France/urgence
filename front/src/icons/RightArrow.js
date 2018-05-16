import React from 'react';
import PropTypes from 'prop-types';

import RightArrowIcon from './rightArrow.svg';

export const RightArrow = ({ color, onClick, size }) => (
    <RightArrowIcon
        fill={color}
        width={size}
        height={size}
        viewBox={`0 0 48 48`}
        onClick={onClick}
    />
);

RightArrow.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func,
};

RightArrow.defaultProps = {
    size: 32,
};

export default RightArrow;
