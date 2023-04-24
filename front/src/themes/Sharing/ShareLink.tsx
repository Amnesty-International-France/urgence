import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import classnames from 'classnames';
import React, { Fragment } from 'react';

import { secureUseEffect } from '../../hooks/secureHooks';

type OwnProps = {
    slug?: string;
    step?: string;
    href: string;
    target: string;
    title: string;
    icon: any;
    text?: string;
    action?: (...args: any[]) => any;
    customClass?: string;
    customScript?: React.ReactElement;
    analyticsCategory?: string;
    buttonName?: string;
    backgroundColor?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ShareLink.defaultProps;

// @ts-expect-error TS(7022): 'ShareLink' implicitly has type 'any' because it d... Remove this comment to see the full error message
export const ShareLink = ({
    slug,
    step,
    action,
    href,
    target,
    title,
    text,
    icon,
    customClass,
    customScript,
    analyticsCategory,
    buttonName,
    backgroundColor,
}: Props) => {
    return (
        <Fragment>
            {customScript}
            {/* @ts-expect-error TS(2769): No overload matches this call. */}
            <IconButton
                className={classnames(`${customClass}`)}
                style={{ color: '#fff', backgroundColor }}
                size="medium"
                href={href}
                target={target}
                title={title}
                label={text}
                onClick={(event) => {
                    if (action) {
                        action(event);
                    }
                }}
            >
                <SvgIcon>
                    <FontAwesomeIcon icon={icon} size="2x" />
                </SvgIcon>
            </IconButton>
        </Fragment>
    );
};

ShareLink.defaultProps = {
    target: '_blank',
    action: () => {},
    inLine: false,
    customClass: '',
    customScript: null,
};

export default ShareLink;
