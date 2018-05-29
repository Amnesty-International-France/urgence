import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import { pink, white } from '../themes/colors';
import { withWhiteLogo } from '../themes/ThemeContext';

export const Act = ({ callToAction, className, action }) => (
    <div className={className}>
        <div>
            <h1>Génial !</h1>
            <RichText html={callToAction} />
        </div>
        {action}
    </div>
);

Act.propTypes = {
    callToAction: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

export default glamorous(withWhiteLogo(Act))({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: pink,
    color: white,
    height: '100%',
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
        '& a': {
            alignSelf: 'flex-end',
        },
    },
    '& h1': {
        marginTop: '122px',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        padding: '2rem 3rem',
        textAlign: 'center',
        fontSize: '56px',
        fontWeight: 'bold',
    },
    '& .rich-text': {
        margin: '22px 31px',
        textAlign: 'center',
        fontSize: '28px',
        lineHeight: '33px',
        fontWeight: 'bold',
    },
    '& a': {
        margin: '0 1rem 2rem 1rem',
    },
});
