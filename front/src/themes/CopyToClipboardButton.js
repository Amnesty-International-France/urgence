import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

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

    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleOnClick = () => {
        copy(textToCopy);
        setCopied(true);
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    useEffect(() => {
        if (!copied) {
            return;
        }
        setTimeout(() => {
            setHovered(false);
        }, 1400);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }, [copied]);

    return (
        <Tooltip title={copied ? 'Link copied!' : 'Click to copy'} open={hovered}>
            <IconButton
                link
                onClick={handleOnClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
};

CopyToClipboard.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    textToCopy: PropTypes.string,
};

export default CopyToClipboard;
