import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { pink, white } from '../themes/colors';
import { Email, Share } from '../icons';

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

export const Thanks = ({ className }) => (
    <div className={className}>
        <div className="content">
            <h1>Merci de votre soutien !</h1>
            <p className="text">
                Pour aller plus loin, vous pouvez envoyer une lettre à l'ambassade d'Égypte ou
                partager cette histoire avec vos amis.
            </p>
        </div>
        <div className="actions">
            <Email />
            <Share />
        </div>
    </div>
);

Thanks.propTypes = {
    className: PropTypes.string.isRequired,
};

export default glamorous(Thanks)(styles);
