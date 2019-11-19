import React from 'react';
import PropTypes from 'prop-types';
import { yellow, grey, textColorForBackgroundColor } from './colors';

import glamorous from 'glamorous';

const IconButtonContainer = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0.5em',
    width: '42px',
    height: '42px',
    boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: yellow,
    color: textColorForBackgroundColor('yellow'),
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.25s ease',
    '&:disabled': {
        backgroundColor: grey,
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
