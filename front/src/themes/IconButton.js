import React from 'react';
import PropTypes from 'prop-types';
import { yellow } from './colors';

import glamorous from 'glamorous';

const IconButtonContainer = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: yellow,
    transition: 'all ease-in 0.2s',
    width: '40px',
    height: '40px',
    boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    userSelect: 'none',
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
