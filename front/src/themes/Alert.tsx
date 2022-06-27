import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileDetect from 'mobile-detect';

// @ts-expect-error TS(6142): Module './RichText' was resolved to '/home/guillau... Remove this comment to see the full error message
import { RichText } from './RichText';

const styles = {
    '& .alert-icon': {
        cursor: 'pointer',
    },
};

const isOnDesktop = () => {
    const md = new MobileDetect(global.navigator.userAgent);
    return !md.mobile();
};

type AlertProps = {
    className: string;
    message: string;
};

const Alert = ({ className, message }: AlertProps) => {
    const [open, setOpen] = useState(isOnDesktop());

    const handleClose = () => {
        setOpen(false);
    };

    return open ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Snackbar
            className={className}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            open={open}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            message={<RichText html={message} />}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
            action={
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

export default styled(Alert)(styles);
