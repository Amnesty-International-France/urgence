import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';

import RichText from '../../themes/RichText';
import LongText from '../../themes/LongText';
import { white, black } from '../../themes/colors';
import { withYellowLogo } from '../../themes/ThemeContext';
import Share from '../../themes/Sharing/ShareForm';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '0.8em',
    padding: '60px 15px 20px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        width: '100%',
        padding: '135px 20px 20px 20px',
        color: black,
        backgroundColor: white,
    },
    '& .header': {
        margin: '1em 0',
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
    '@media (min-width: 350px)': {
        fontSize: '16px',
    },
    '@media (min-width: 1024px)': {
        '&.paper': {
            padding: '10vh 10vw',
        },
        '& .link': {
            textAlign: 'center',
        },
    },
};

export const SharingScreen = ({
    className,
    slug,
    step,
    title,
    message,
    share,
    link,
    analyticsCategory,
}) => (
    <div className={classnames('share', className)}>
        <Paper className="paper" elevation={6} square>
            <div className="header">
                <h1>
                    <LongText text={title} />
                </h1>
                {message && <RichText html={message} />}
            </div>
            {share && (
                <Share
                    {...share}
                    slug={slug}
                    step={step}
                    link={link}
                    analyticsCategory={analyticsCategory}
                />
            )}
        </Paper>
    </div>
);

SharingScreen.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    share: PropTypes.object,
    analyticsCategory: PropTypes.string,
    link: PropTypes.string,
};

SharingScreen.defaultProps = {
    title: '',
    message: '',
    share: {},
};

export default glamorous(withYellowLogo(SharingScreen))(styles);
