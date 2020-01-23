import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import glamorous from 'glamorous';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileDetect from 'mobile-detect';

import { RichText } from './RichText';

const styles = {
    '& .alert-icon': {
        cursor: 'pointer',
    },
};

const isOnDesktop = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    return !md.mobile();
};

const Alert = ({ className, message }) => {
    const [open, setOpen] = useState(isOnDesktop());

    const handleClose = () => {
        setOpen(false);
    };

    return open ? (
        <Snackbar
            className={className}
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
                    className="alert-icon"
                    onClick={handleClose}
                />
            }
        />
    ) : null;
};

Alert.propTypes = {
    className: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default glamorous(Alert)(styles);
