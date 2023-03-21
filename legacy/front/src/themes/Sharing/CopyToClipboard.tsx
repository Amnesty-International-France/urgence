import styled from '@emotion/styled';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';

import trackEvent from '../../analytics/trackEvent';
import { black } from 'amnesty-components';
import CopyToClipboardButton from '../CopyToClipboardButton';

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
        <CopyToClipboardButton textToCopy={url}>
            <div className="inline">
                <span className="url">{url}</span>
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
