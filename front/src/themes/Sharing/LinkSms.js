import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
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
        marginRight: 10,
    },
};

export const LinkSms = ({ classes, text, action }) => (
    <Button
        className={classes.root}
        href={`sms://?body=${text}`}
        target="sms"
        title="Partage par sms"
        onClick={action}
    >
        <FontAwesomeIcon icon={faCommentDots} className={classes.icon} />
        Envoyer un sms
    </Button>
);

LinkSms.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
    classes: PropTypes.object,
};

LinkSms.defaultProps = {
    text: '',
    action: () => {},
};

export default withStyles(styles)(LinkSms);
