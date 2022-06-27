import React from 'react';
import PropTypes from 'prop-types';
import { black, yellow, grey, darkGrey } from './colors';

import styled from '@emotion/styled';

const IconButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0.5em',
    width: '42px',
    height: '42px',
    boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
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
    '&.transparent': {
        backgroundColor: 'transparent',
        color: darkGrey,
        boxShadow: 'none',
    },
});

const IconButton = ({ className, children, onClick, onMouseEnter, onMouseLeave }) => (
    <IconButtonContainer
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {children}
    </IconButtonContainer>
);

IconButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

IconButton.defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
};

export default IconButton;
