import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import RichText from '../RichText';
import LongText from '../LongText';
import { white, black } from '../colors';
import { withYellowLogo } from '../ThemeContext';
import Share from './Share';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    width: '100%',
    padding: '100px 20px 20px 20px',
    color: white,
    backgroundColor: white,
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
};

export const SharingScreen = ({ className, title, message, share, auId }) => (
    <div className={className}>
        <div>
            <h1>
                <LongText text={title} />
            </h1>
            {message && <RichText html={message} />}
        </div>
        {share && <Share {...share} auId={auId} />}
    </div>
);

SharingScreen.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    share: PropTypes.object,
    auId: PropTypes.string,
};

SharingScreen.defaultProps = {
    title: '',
    message: '',
};

export default glamorous(withYellowLogo(SharingScreen))(styles);
