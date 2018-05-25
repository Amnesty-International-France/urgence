import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import ThankInput from './ThankInput';
import { pink } from '../../../front/src/themes/colors';
import { Avatar } from 'material-ui';
import Email from '@material-ui/icons/Email';

const styles = {
    root: {
        display: 'flex',
    },
    avatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: pink,
    },
};

export const ThanksTab = ({ classes }) => (
    <div className={classes.root}>
        <ThankInput
            source="email_thank"
            label="Email Thanks"
            avatar={<Avatar className={classes.avatar}>@</Avatar>}
        />
        <ThankInput
            source="letter_thank"
            label="Letter Thanks"
            avatar={
                <Avatar className={classes.avatar}>
                    <Email />
                </Avatar>
            }
        />
    </div>
);

ThanksTab.propTypes = {
    classes: PropTypes.object,
};

export default injectSheet(styles)(ThanksTab);
