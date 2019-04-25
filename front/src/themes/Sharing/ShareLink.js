import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    big: {
        textDecoration: 'none',
        color: black,
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontWeight: 'bold',
        fontSize: 27,
    },
    icon: {
        marginRight: 10,
    },
};

export const ShareLink = ({
    classes,
    action,
    href,
    target,
    title,
    text,
    icon,
    bigSize,
    customClass,
    customScript,
}) => (
    <Fragment>
        {customScript}
        <Button
            className={classnames(bigSize ? classes.big : classes.root, `${customClass}`)}
            href={href}
            target={target}
            title={title}
            onClick={action}
        >
            <FontAwesomeIcon icon={icon} className={classes.icon} />
            {text}
        </Button>
    </Fragment>
);

ShareLink.propTypes = {
    href: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
    classes: PropTypes.object,
    bigSize: PropTypes.bool,
    customClass: PropTypes.string,
    customScript: PropTypes.element,
};

ShareLink.defaultProps = {
    target: '_blank',
    action: () => {},
    bigSize: false,
    customClass: '',
    customScript: null,
};

export default withStyles(styles)(ShareLink);
