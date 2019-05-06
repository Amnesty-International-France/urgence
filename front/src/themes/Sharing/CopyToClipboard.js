import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import trackEvent from '../../analytics/trackEvent';
import CopyToClipboardButton from '../CopyToClipboardButton';
import Button from '@material-ui/core/Button';

import { black } from '../colors';

const styles = {
    root: {
        textDecoration: 'none',
        alignSelf: 'start',
        padding: 10,
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: 16,
        textTransform: 'none',
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 10,
        width: '28px !important',
    },
    bloc: {
        display: 'flex',
        flexDirection: 'column',
    },
};

export const CopyToClipboard = ({ classes, slug, step, url, action, analyticsCategory }) => (
    <Button
        className={classes.root}
        onClick={event => {
            if (action) action(event);
            trackEvent(analyticsCategory, 'Click', 'button', 'CopyToClipboard', slug, step, {
                disabled: false,
                label: 'Copy to clipboard',
            });
        }}
    >
        <CopyToClipboardButton textToCopy={url}>
            <div className={classes.bloc}>
                <FontAwesomeIcon icon={faLink} size="2x" className={classes.icon} />
            </div>
        </CopyToClipboardButton>
    </Button>
);

CopyToClipboard.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    url: PropTypes.string.isRequired,
    action: PropTypes.func,
    classes: PropTypes.object,
    analyticsCategory: PropTypes.string,
};

CopyToClipboard.defaultProps = {
    url: '',
    action: () => {},
};

export default withStyles(styles)(CopyToClipboard);
