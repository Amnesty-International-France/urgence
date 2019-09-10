import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
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

    function handleClose() {
        setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            open={open}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<RichText html={message} />}
            TransitionComponent={props => <Slide {...props} direction="down" />}
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
