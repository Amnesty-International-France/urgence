import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import CopyToClipboardButton from '../CopyToClipboardButton';
import Button from '@material-ui/core/Button';

import { black } from '../colors';

const styles = {
    root: {
        textDecoration: 'none',
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: 16,
        textTransform: 'none',
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    text: {
        display: 'block',
        lineHeight: '15px',
    },
};

export const CopyToClipboard = ({ classes, url, action }) => (
    <Button className={classes.root} onClick={action}>
        <CopyToClipboardButton textToCopy={url}>
            <div>
                <FontAwesomeIcon icon={faLink} size="2x" className={classes.icon} />
                <span className={classes.text}>Copier le lien</span>
            </div>
        </CopyToClipboardButton>
    </Button>
);

CopyToClipboard.propTypes = {
    url: PropTypes.string.isRequired,
    action: PropTypes.func,
    classes: PropTypes.object,
};

CopyToClipboard.defaultProps = {
    url: '',
    action: () => {},
};

export default withStyles(styles)(CopyToClipboard);
