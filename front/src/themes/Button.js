import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { black, yellow } from './colors';

const StyledButton = glamorous.button({
    backgroundColor: yellow,
    border: 'none',
    color: black,
    width: '85vw',
    fontFamily: 'Amnesty Trade Gothic Condensed',
    fontWeight: 'bold',
    fontSize: '27px',
    height: '42px',
    '&:active': {
        backgroundColor: yellow,
    },
    '&:disabled': {
        backgroundColor: 'grey',
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
