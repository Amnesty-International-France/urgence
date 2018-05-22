import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { black, yellow } from './colors';

export const Link = ({ to, label, disabled, className }) => (
    <RouterLink to={to} disabled={disabled} className={className}>
        {label}
    </RouterLink>
);

Link.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default glamorous(Link)({
    display: 'block',
    backgroundColor: yellow,
    color: black,
    padding: '0 0.5em',
    margin: '0 1em',
    fontFamily: 'Amnesty Trade Gothic Condensed',
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: '42px',
    height: 42,
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    '&:active': {
        backgroundColor: yellow,
    },
    '&:disabled': {
        backgroundColor: 'grey',
    },
});
