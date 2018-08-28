import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { pink, white } from '../themes/colors';
import Email from '../icons/Email';
import { withWhiteLogo } from '../themes/ThemeContext';
import Link from './Link';
import { LinkType } from '../propTypes';

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
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
    },
    '& svg': {
        fill: 'white',
        fontSize: '3em',
        alignSelf: 'center',
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        marginBottom: 29,
        padding: '0 3rem',
    },

    '& .content': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '2rem',
    },

    '& .text': {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 50,
    },

    '& .actions': {
        fill: white,
        '& a': {
            marginBottom: '1rem',
        },
        '& .link': {
            textAlign: 'center',
        },
    },
};

export const Thanks = ({ className, title, text, link, actions }) => (
    <div className={classnames('thanks', className)}>
        <div className="content">
            <Email />
            <h1>{title}</h1>
            {text && <p className="text">{text}</p>}
        </div>
        <div className="actions">
            {actions()}
            {get(link, 'url') && <Link {...link} color={white} />}
        </div>
    </div>
);

Thanks.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    actions: PropTypes.func,
    link: LinkType,
};

Thanks.defaultProps = {
    actions: () => {},
};

export default glamorous(withWhiteLogo(Thanks))(styles);
