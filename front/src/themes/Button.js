import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { black, yellow, grey, darkGrey } from './colors';

const StyledButton = glamorous.button({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Amnesty Trade Gothic Condensed',
    fontWeight: 'bold',
    fontSize: '26px',
    padding: '0 1em',
    lineHeight: '42px',
    minWidth: '42px',
    width: '100%',
    height: '42px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: yellow,
    color: black,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.25s ease',
    '&:disabled': {
        backgroundColor: grey,
        color: darkGrey,
        pointerEvents: 'none',
    },
});

export const Button = ({ label, onClick, className, disabled }) => (
    <StyledButton className={className} onClick={onClick} disabled={disabled}>
        {label.toUpperCase()}
    </StyledButton>
);

Button.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};
