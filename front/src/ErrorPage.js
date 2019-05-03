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
    '& .error': {
        color: white,
        margin: 30,
    },
    '& .candle': {
        fill: white,
        fontSize: 133,
    },
};

const ErrorPage = ({ className }) => (
    <div className={className}>
        <AmnestyCandle className="candle" />
        <p className="error">Oups. Une erreur s&#39;est produite 🙈</p>
    </div>
);

ErrorPage.propTypes = {
    className: PropTypes.string.isRequired,
};

export default glamorous(withYellowLogo(ErrorPage))(styles);
