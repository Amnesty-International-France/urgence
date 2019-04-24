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
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontWeight: 'bold',
        fontSize: 27,
    },
    svg: {
        width: '100%',
        height: '100%',
    },
    icon: {
        //border: '1px solid #000',
        borderRadius: '50%',
        alignItems: 'center',
        width: 50,
        height: 50,
        padding: 10,
        lineHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
        marginRight: 10,
    },
};

export const LinkTwitter = ({ classes, text, action }) => (
    <Button
        className={classnames(classes.root, 'twitter-share-button')}
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="twitter"
        title="Partage Twitter"
        onClick={action}
    >
        <FontAwesomeIcon icon={fab.faTwitter} className={classes.icon} />
        Envoyer le tweet
    </Button>
);

LinkTwitter.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
};

LinkTwitter.defaultProps = {
    text: '',
    action: () => {},
};

export default withStyles(styles)(LinkTwitter);
