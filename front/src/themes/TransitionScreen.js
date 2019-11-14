import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import RichText from '../themes/RichText';
import LongText from '../themes/LongText';
import { yellow, white, black } from '../themes/colors';
import { withBlackLogo } from '../themes/ThemeContext';
import Paper from '@material-ui/core/Paper';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    width: '100%',
    padding: '100px 20px 20px 20px',
    color: white,
    backgroundColor: `${yellow} !important`,
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
        lineHeight: '54px',
        fontWeight: 'bold',
        margin: '1.5rem 12px',
        width: 'calc(100% - 24px)',
        '> span': {
            color: white,
            backgroundColor: black,
            padding: '6px 0',
            boxShadow: `12px 0 0 ${black}, -12px 0 0 ${black}`,
            boxDecorationBreak: 'clone',
        },
    },
    '& .rich-text': {
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: '16px',
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
    },
};

export const TransitionScreen = ({ className, actions, title, message }) => (
    <Paper className={className} elevation={4}>
        <div>
            <h1>
                <LongText text={title} />
            </h1>
            {message && <RichText html={message} />}
        </div>
        <div className="actions">{actions()}</div>
    </Paper>
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

export default glamorous(withBlackLogo(TransitionScreen))(styles);
