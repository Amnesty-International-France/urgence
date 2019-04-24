import React, { Fragment } from 'react';
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

export const LinkFacebook = ({ classes, url, action }) => (
    <Fragment>
        <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.2"
        />
        <Button
            className={classnames(classes.root, 'fb-share-button')}
            href={`https://facebook.com/sharer/sharer.php?u=${url}`}
            target="facebook"
            title="Partage facebook"
            onClick={action}
        >
            <FontAwesomeIcon icon={fab.faFacebook} className={classes.icon} />
            Partager sur facebook
        </Button>
    </Fragment>
);

LinkFacebook.propTypes = {
    auId: PropTypes.string.isRequired,
    action: PropTypes.func,
};

LinkFacebook.defaultProps = {
    auId: '',
    action: () => {},
};

export default withStyles(styles)(LinkFacebook);
