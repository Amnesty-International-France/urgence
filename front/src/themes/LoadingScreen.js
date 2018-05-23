import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { AmnestyCandle } from '../icons';

const styles = {
    fontSize: 133,
    fill: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    width: '100vw',
    height: '100vh',
};

export const LoadingScreen = ({ className }) => (
    <div className={className}>
        <AmnestyCandle />
    </div>
);

LoadingScreen.propTypes = {
    className: PropTypes.string.isRequired,
};

export default glamorous(LoadingScreen)(styles);
