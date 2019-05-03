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
    '& .not-found': {
        color: white,
        margin: 30,
    },
    '& .candle': {
        fill: white,
        fontSize: 133,
    },
};

const HomePage = ({ className, title, description }) => (
    <Fragment>
        <SEO title={title} description={description} />
        <div className={className}>
            <AmnestyCandle className="candle" />
            <p className="not-found">{description}</p>
        </div>
    </Fragment>
);

HomePage.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

HomePage.defaultProps = {
    title: `404`,
    description: `Cette action urgente n'existe plus.`,
};

export default glamorous(withYellowLogo(HomePage))(styles);
