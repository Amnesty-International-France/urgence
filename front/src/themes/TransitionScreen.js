import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from '@material-ui/core/Paper';

import RichText from '../themes/RichText';
import LongText from '../themes/LongText';
import { yellow, black } from '../themes/colors';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    margin: '60px 15px 15px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: black,
        backgroundColor: yellow,
        minHeight: '70vh',
    },
    '& .step': {
        display: 'flex',
        flex: '1 0 0',
        flexDirection: 'column',
        margin: '90px 20px 20px',
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
        color: black,
        textTransform: 'uppercase',
        lineHeight: '30px',
    },
    '& .rich-text': {
        color: black,
    },
    '& .text': {
        margin: '0.5em 0',
    },
    '& .actions': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontWeight: 'bold',
        fontSize: '26px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 15px',
        marginTop: '-30px',
        height: '60px',
        '& a': {
            width: '100%',
        },
    },
    '@media (min-width: 1024px)': {
        fontSize: '24px',
        '& .paper': {
            padding: '10vh 10vw',
        },
        '& .link': {
            textAlign: 'center',
        },
        '& .actions': {
            '& a': {
                width: 'fit-content',
            },
        },
    },
};

export const TransitionScreen = ({ className, actions, title, message }) => (
    <div className={className}>
        <Paper className="paper" elevation={4} square>
            <div className="step">
                <h1>
                    <LongText text={title} />
                </h1>
                {message && (
                    <div className="text">
                        <RichText html={message} />
                    </div>
                )}
            </div>
        </Paper>
        <div className="actions">{actions()}</div>
    </div>
);

TransitionScreen.propTypes = {
    className: PropTypes.string.isRequired,
    actions: PropTypes.func,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

TransitionScreen.defaultProps = {
    actions: () => {},
    title: '',
    message: '',
};

export default glamorous(TransitionScreen)(styles);
