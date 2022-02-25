import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import SEO from './SEO';
import generateUrl from './services/generateUrl';
import { withYellowLogo } from './themes/ThemeContext';
import { white, yellow, black } from './themes/colors';
import Link from './themes/Link';
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
    '& .actions': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontWeight: 'bold',
        fontSize: '26px',
        margin: '1.5rem 0',
        '& a': {
            display: 'inline-block',
            color: yellow,
            backgroundColor: black,
            height: 40,
        },
        '& a:hover': {
            color: black,
            backgroundColor: yellow,
        },
    },
};

const ErrorPage = ({ className, title, description }) => (
    <Fragment>
        <SEO socialMetadata={{ title, description }} />
        <div className={className}>
            <AmnestyCandle className="candle" />
            <p className="error">{description}</p>
            <div className="actions">
                <Link to={generateUrl('home')} label="Participer à notre dernière action urgente" />
            </div>
        </div>
    </Fragment>
);

ErrorPage.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

ErrorPage.defaultProps = {
    title: `Une erreur s'est produite 🙊`,
    description: `Oups. Tout ne s'est pas passé comme prévu 🙈.`,
};

export default glamorous(withYellowLogo(ErrorPage))(styles);
