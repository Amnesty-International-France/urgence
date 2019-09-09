import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

const styles = {
    icon: {
        cursor: 'pointer',
    },
    message: {
        opacity: 0.6,
    },
};

const DesktopAlert = ({ classes }) => {
    const [open, setOpen] = useState(window.innerWidth > 900);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <Snackbar
            className={classes.message}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            open={open}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={
                <span id="message-id">
                    Cette action est optimisée pour un affichage sur <b>smartphone</b>.
                </span>
            }
            action={
                <FontAwesomeIcon
                    icon={faTimes}
                    size="1x"
                    className={classes.icon}
                    onClick={handleClose}
                />
            }
        />
    );
};

DesktopAlert.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DesktopAlert);
