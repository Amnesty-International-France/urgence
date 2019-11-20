import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileDetect from 'mobile-detect';

import { RichText } from './RichText';

const styles = {
    icon: {
        cursor: 'pointer',
    },
};

const isOnDesktop = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    return !md.mobile();
};

const Alert = ({ classes, message }) => {
    const [open, setOpen] = useState(isOnDesktop());

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            open={open}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<RichText html={message} />}
            TransitionComponent={props => <Slide {...props} direction="up" />}
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

Alert.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
};

export default withStyles(styles)(Alert);
