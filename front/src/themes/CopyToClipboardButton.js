import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const copy = textToCopy => {
    const textField = document.createElement('textarea');
    textField.innerText = textToCopy;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
};

const setUseStateForAdmin = () => {
    try {
        return useState(false);
    } catch (error) {
        /* eslint-disable no-console */
        console.log("useState doesn't work through admin preview");
        console.log(error.message);
        return [false, () => true];
    }
};

const setUseEffectForAdmin = action => {
    try {
        return useEffect(action);
    } catch (error) {
        /* eslint-disable no-console */
        console.log("useEffect doesn't work through admin preview");
        console.log(error.message);
        return [action, () => true];
    }
};

const CopyToClipboard = ({ children, textToCopy, ...props }) => {
    if (!textToCopy) {
        return;
    }

    const [copied, setCopied] = setUseStateForAdmin();
    const [hovered, setHovered] = setUseStateForAdmin();

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

    setUseEffectForAdmin(() => {
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
            {React.cloneElement(children, {
                onClick: handleOnClick,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                ...props,
            })}
        </Tooltip>
    );
};

CopyToClipboard.propTypes = {
    children: PropTypes.element,
    textToCopy: PropTypes.string,
};

export default CopyToClipboard;
