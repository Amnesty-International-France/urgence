import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import trackEvent from '../../analytics/trackEvent';
// @ts-expect-error TS(6142): Module '../CopyToClipboardButton' was resolved to ... Remove this comment to see the full error message
import CopyToClipboardButton from '../CopyToClipboardButton';
import { black } from '../colors';

const styles = {
    textDecoration: 'none',
    alignSelf: 'start',
    padding: 10,
    color: black,
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: 16,
    textTransform: 'none',
    maxWidth: '100%',
    '& .inline': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    '& .icon': {
        alignSelf: 'center',
        marginRight: 10,
        width: '28px !important',
    },
    '& .url': {
        maxWidth: 220,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textTransform: 'lowercase',
        '@media (min-width: 1024px)': {
            maxWidth: '100%',
        },
    },
};

type OwnProps = {
    className: string;
    slug?: string;
    step?: string;
    url: string;
    action?: (...args: any[]) => any;
    analyticsCategory?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof CopyToClipboard.defaultProps;

// @ts-expect-error TS(7022): 'CopyToClipboard' implicitly has type 'any' becaus... Remove this comment to see the full error message
export const CopyToClipboard = ({
    className,
    slug,
    step,
    url,
    action,
    analyticsCategory,
}: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Button
        className={className}
        onClick={(event) => {
            if (action) action(event);
            trackEvent(analyticsCategory, 'Click', 'button', 'CopyToClipboard', slug, step, {
                disabled: false,
                label: 'Copy to clipboard',
            });
        }}
        variant="outlined"
    >
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CopyToClipboardButton textToCopy={url}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="inline">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <span className="url">{url}</span>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <FontAwesomeIcon icon={faLink} size="2x" className="icon" />
            </div>
        </CopyToClipboardButton>
    </Button>
);

CopyToClipboard.defaultProps = {
    url: '',
    action: () => {},
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(CopyToClipboard)(styles);
