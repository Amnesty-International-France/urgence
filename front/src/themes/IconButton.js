import React from 'react';
import PropTypes from 'prop-types';

import glamorous from 'glamorous';

const IconButtonContainer = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'none',
    transition: 'all ease-in 0.2s',
    borderRadius: '20px',
    width: '40px',
    height: '40px',
    '-webkit-tap-highlight-color': 'transparent',
    ':active': {
        backgroundColor: 'rgb(255, 255, 0, 0.6)',
    },
});

const IconButton = ({ children, onClick }) => (
    <IconButtonContainer
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onClick={onClick}
    >
        {children}
    </IconButtonContainer>
);

IconButton.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default IconButton;
