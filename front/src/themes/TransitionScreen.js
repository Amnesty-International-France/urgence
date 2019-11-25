import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from '@material-ui/core/Paper';

import RichText from '../themes/RichText';
import LongText from '../themes/LongText';
import { yellow, black } from '../themes/colors';

const styles = {
    padding: '60px 15px 20px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
        width: '100%',
        padding: '100px 20px 40px 20px',
        backgroundColor: yellow,
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '36px',
        color: black,
        textTransform: 'uppercase',
    },
    '& .rich-text': {
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: '16px',
        color: black,
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
            <div>
                <h1>
                    <LongText text={title} />
                </h1>
                {message && <RichText html={message} />}
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
