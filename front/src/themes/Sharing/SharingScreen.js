import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import RichText from '../RichText';
import LongText from '../LongText';
import { yellow, white, black } from '../colors';
import { withYellowLogo } from '../ThemeContext';
import { LinkType } from '../../propTypes';
import Link from '../Link';
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

export const SharingScreen = ({ className, actions, title, message, link, share, auId }) => (
    <div className={className}>
        <div>
            <h1>
                <LongText text={title} />
            </h1>
            {message && <RichText html={message} />}
        </div>
        <div className="actions">
            {actions()}
            {link && link.url && <Link {...link} color={black} />}
        </div>
        {share && <Share {...share} auId={auId} />}
    </div>
);

SharingScreen.propTypes = {
    className: PropTypes.string.isRequired,
    actions: PropTypes.func,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: LinkType,
    share: PropTypes.object,
    auId: PropTypes.string,
};

SharingScreen.defaultProps = {
    actions: () => {},
    title: '',
    message: '',
};

export default glamorous(withYellowLogo(SharingScreen))(styles);
