import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import { secureUseState, secureUseEffect } from '../hooks/secureHooks';

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

    const [copied, setCopied] = secureUseState(false);
    const [hovered, setHovered] = secureUseState(false);

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

    secureUseEffect(() => {
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
