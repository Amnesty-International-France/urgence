import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { black, yellow } from './colors';

export const styles = {
    display: 'block',
    '@media (min-width: 1024px)': {
        display: 'inline-block',
    },
    backgroundColor: yellow,
    color: black,
    padding: '0 0.5em',
    fontFamily: 'Amnesty Trade Gothic Condensed',
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: '42px',
    height: 42,
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    transition: 'opacity 0.25s ease',
    '&.disabled': {
        opacity: 0.25,
        pointerEvents: 'none',
    },
};

export const Link = ({ to, label, disabled, className, onClick }) => (
    <RouterLink to={to} className={classnames(className, { disabled: disabled })} onClick={onClick}>
        {label}
    </RouterLink>
);

Link.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default glamorous(Link)(styles);
