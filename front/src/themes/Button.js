import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const StyledButton = glamorous.button({
    backgroundColor: 'rgb(24, 93, 141)',
    border: 'none',
    padding: '1rem',
    color: 'white',
    width: '100%',
    margin: '20px 0',
    '&:active': {
        backgroundColor: 'rgb(44, 103, 161)',
    },
});

export const Button = ({ label, onClick, className }) => (
    <StyledButton className={className} onClick={onClick}>
        {label.toUpperCase()}
    </StyledButton>
);

Button.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
