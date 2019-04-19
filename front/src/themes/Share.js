import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from './RichText';
import { yellow, white, black } from './colors';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    padding: '100px 20px 20px 20px',
    color: white,
    backgroundColor: yellow,
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
        '& .link': {
            textAlign: 'center',
        },
    },
    '& h1': {
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '36px',
        lineHeight: '55px',
        fontWeight: 'bold',
        margin: '1.5rem 12px',
        width: 'calc(100% - 24px)',
        '> span': {
            color: white,
            backgroundColor: black,
            padding: '6px 0',
            boxShadow: `12px 0 0 ${black}, -12px 0 0 ${black}`,
        },
    },
    '& .rich-text': {
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: '16px',
    },
};

export const Share = ({ className, message }) => (
    <div className={className}>
        <div>{message && <RichText html={message} />}</div>
    </div>
);

Share.propTypes = {
    message: PropTypes.string.isRequired,
};

Share.defaultProps = {
    message: '',
};

export default glamorous(Share)(styles);
