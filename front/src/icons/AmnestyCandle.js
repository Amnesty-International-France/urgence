import React from 'react';
import PropTypes from 'prop-types';

import Candle from './candle.svg';

export const AmnestyCandle = ({ color, size }) => (
    <Candle fill={color} width={size} height={size} />
);

AmnestyCandle.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};

AmnestyCandle.defaultProps = {
    size: 32,
};

export default AmnestyCandle;
