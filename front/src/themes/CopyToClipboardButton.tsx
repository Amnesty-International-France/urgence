import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { secureUseState, secureUseEffect } from '../hooks/secureHooks';

const copy = (textToCopy: any) => {
    const textField = document.createElement('textarea');
    textField.innerText = textToCopy;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
};

type CopyToClipboardProps = {
    children?: React.ReactElement;
    textToCopy?: string;
};

const CopyToClipboard = ({ children, textToCopy, ...props }: CopyToClipboardProps) => {
    if (!textToCopy) {
        return;
    }

    const [copied, setCopied] = secureUseState(false);
    const [hovered, setHovered] = secureUseState(false);

    const handleOnClick = () => {
        copy(textToCopy);
        // @ts-expect-error TS(2349): This expression is not callable.
        setCopied(true);
    };

    const handleMouseEnter = () => {
        // @ts-expect-error TS(2349): This expression is not callable.
        setHovered(true);
    };

    const handleMouseLeave = () => {
        // @ts-expect-error TS(2349): This expression is not callable.
        setHovered(false);
    };

    secureUseEffect(() => {
        if (!copied) {
            return;
        }
        setTimeout(() => {
            // @ts-expect-error TS(2349): This expression is not callable.
            setHovered(false);
        }, 1400);

        setTimeout(() => {
            // @ts-expect-error TS(2349): This expression is not callable.
            setCopied(false);
        }, 1500);
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    }, [copied]);

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Tooltip title={copied ? 'Lien copié !' : 'Cliquer pour copier'} open={hovered}>
            {/* @ts-expect-error TS(2769): No overload matches this call. */}
            {React.cloneElement(children, {
                onClick: handleOnClick,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                ...props,
            })}
        </Tooltip>
    );
};

export default CopyToClipboard;
