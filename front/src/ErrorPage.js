import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import SEO from './SEO';
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

const ErrorPage = ({ className, title, description }) => (
    <Fragment>
        <SEO title={title} description={description} />
        <div className={className}>
            <AmnestyCandle className="candle" />
            <p className="error">{description}</p>
        </div>
    </Fragment>
);

ErrorPage.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

ErrorPage.defaultProps = {
    title: `Une erreur s'est produite`,
    description: `Oups. Une erreur s'est produite 🙈.`,
};

export default glamorous(withYellowLogo(ErrorPage))(styles);
