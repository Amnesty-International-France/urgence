import React from 'react';
import PropTypes from 'prop-types';

import IconButton from './IconButton';

const copy = textToCopy => {
    const textField = document.createElement('textarea');
    textField.innerText = textToCopy;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
};

const CopyToClipboard = ({ children, textToCopy, ...props }) => {
    if (!textToCopy) {
        return;
    }

    const title = 'Click to copy link';
    const handleOnClick = () => copy(textToCopy);

    return (
        <IconButton title={title} onClick={handleOnClick} {...props}>
            {children}
        </IconButton>
    );
};

CopyToClipboard.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    textToCopy: PropTypes.string,
};

export default CopyToClipboard;
