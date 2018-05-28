import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { pink, white } from '../themes/colors';
import Email from '../icons/Email';
import { withWhiteLogo } from '../themes/ThemeContext';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: pink,
    color: white,
    height: '100%',
    width: '100%',
    textAlign: 'center',
    padding: '0 31px 50px',
    '& svg': {
        fill: 'white',
        fontSize: '3em',
        alignSelf: 'center',
    },
    '&': {
        '@media (min-aspect-ratio: 1/1)': {
            padding: '15vw 25vh',
        },
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        marginBottom: 29,
    },

    '& .content': {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 0',
        justifyContent: 'center',
    },

    '& .text': {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 50,
    },

    '& .actions': {
        flex: '0 0 64px',
        display: 'flex',
        justifyContent: 'center',
        fill: white,
        fontSize: 64,
        '& > *:not(:last-child)': {
            marginRight: 92,
        },
    },
};

export const Thanks = ({ className, title, text, actions }) => (
    <div className={className}>
        <div className="content">
            <Email />
            <h1>{title}</h1>
            {text && <p className="text">{text}</p>}
        </div>
        <div className="actions">{actions()}</div>
    </div>
);

Thanks.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    actions: PropTypes.func,
};

Thanks.defaultProps = {
    actions: () => {},
};

export default glamorous(withWhiteLogo(Thanks))(styles);
