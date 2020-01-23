import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import trackEvent from '../../analytics/trackEvent';
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

export const CopyToClipboard = ({ className, slug, step, url, action, analyticsCategory }) => (
    <Button
        className={className}
        onClick={event => {
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

CopyToClipboard.propTypes = {
    className: PropTypes.string.isRequired,
    slug: PropTypes.string,
    step: PropTypes.string,
    url: PropTypes.string.isRequired,
    action: PropTypes.func,
    analyticsCategory: PropTypes.string,
};

CopyToClipboard.defaultProps = {
    url: '',
    action: () => {},
};

export default glamorous(CopyToClipboard)(styles);
