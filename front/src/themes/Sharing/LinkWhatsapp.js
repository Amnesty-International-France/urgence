import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import classnames from 'classnames';
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

export const LinkWhatsapp = ({ classes, text, action }) => (
    <Button
        className={classnames(classes.root, 'twitter-share-button')}
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="whatsapp"
        title="Partage Whatsapp"
        onClick={action}
    >
        <FontAwesomeIcon icon={fab.faWhatsapp} className={classes.icon} />
        Partager avec whatsapp
    </Button>
);

LinkWhatsapp.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
    classes: PropTypes.object,
};

LinkWhatsapp.defaultProps = {
    text: '',
    action: () => {},
};

export default withStyles(styles)(LinkWhatsapp);
