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
    borderRadius: '1.5em',
    width: '1.5em',
    height: '1.5em',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    userSelect: 'none',
    ':active': {
        backgroundColor: 'rgb(255, 255, 0, 0.6)',
    },
    '@media (min-width: 1024px)': {
        fontSize: '38px',
        borderRadius: '25px',
        width: '50px',
        height: '50px',
        '&:hover': {
            backgroundColor: 'rgb(255, 255, 0, 0.6)',
        },
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
