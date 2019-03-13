import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import { yellow, white, black } from '../themes/colors';
import { withBlackLogo } from '../themes/ThemeContext';
import { LinkType } from '../propTypes';
import Link from './Link';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    padding: '20px',
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
        fontWeight: 'bold',
        margin: '1.5rem 12px',
        width: 'calc(100% - 12px)',
        '> span': {
            color: white,
            backgroundColor: black,
            padding: '6px 0',
            boxShadow: `10px 0 0 ${black}, -10px 0 0 ${black}`,
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

export const TransitionScreen = ({ className, action, title, message, link }) => (
    <div className={className}>
        <div>
            <h1>
                <span>{title}</span>
            </h1>
            <RichText html={message} />
        </div>
        <div className="actions">
            {action}
            {link && link.url && <Link {...link} color={black} />}
        </div>
    </div>
);

TransitionScreen.propTypes = {
    className: PropTypes.string.isRequired,
    action: PropTypes.element,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: LinkType,
};

export default glamorous(withBlackLogo(TransitionScreen))(styles);
