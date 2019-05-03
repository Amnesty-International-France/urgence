import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { withYellowLogo } from './themes/ThemeContext';
import { white } from './themes/colors';
import AmnestyCandle from './icons/AmnestyCandle';

const styles = {
    fontSize: 33,
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    width: '100vw',
    height: '100vh',
    '& .not-found': {
        color: white,
        margin: 30,
    },
    '& .candle': {
        fill: white,
        fontSize: 133,
    },
};

const HomePage = ({ className }) => (
    <div className={className}>
        <AmnestyCandle className="candle" />
        <p className="not-found">Cette action urgente n&#39;existe plus.</p>
    </div>
);

HomePage.propTypes = {
    className: PropTypes.string.isRequired,
};

export default glamorous(withYellowLogo(HomePage))(styles);
