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

export const LinkFacebook = ({ classes, text }) => (
    <Button
        className={classnames(classes.root, 'twitter-share-button')}
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="facebook"
        title="Partage facebook"
    >
        <FontAwesomeIcon icon={fab.faFacebook} className={classes.icon} />
        Partager sur facebook
    </Button>
);

LinkFacebook.propTypes = {
    text: PropTypes.string.isRequired,
};

LinkFacebook.defaultProps = {
    text: '',
};

export default withStyles(styles)(LinkFacebook);
