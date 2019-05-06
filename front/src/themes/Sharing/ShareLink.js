import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import trackEvent from '../../analytics/trackEvent';
import Button from '@material-ui/core/Button';

import { black } from '../colors';

const styles = {
    root: {
        textDecoration: 'none',
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: 16,
        textTransform: 'none',
        alignSelf: 'start',
        padding: 10,
        marginRight: 20,
    },
    inLine: {
        textDecoration: 'none',
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: 16,
        textTransform: 'none',
        alignSelf: 'start',
        marginLeft: 55,
    },
    inLineButton: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        textDecoration: 'none',
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: 16,
        textTransform: 'none',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: '15px',
    },
    inLineIcon: {
        marginRight: 10,
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 10,
    },
};

export const ShareLink = ({
    classes,
    slug,
    step,
    action,
    href,
    target,
    title,
    text,
    icon,
    inLine,
    customClass,
    customScript,
    analyticsCategory,
    buttonName,
}) => (
    <Fragment>
        {customScript}
        <Button
            className={classnames(inLine ? classes.inLine : classes.root, `${customClass}`)}
            href={href}
            target={target}
            title={title}
            onClick={event => {
                if (action) action(event);
                trackEvent(analyticsCategory, 'Click', 'button', buttonName, slug, step, {
                    disabled: false,
                    label: title,
                });
            }}
        >
            <div className={inLine ? classes.inLineButton : classes.button}>
                <FontAwesomeIcon
                    icon={icon}
                    size="2x"
                    className={inLine ? classes.inLineIcon : classes.icon}
                />
                <span>{text}</span>
            </div>
        </Button>
    </Fragment>
);

ShareLink.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    href: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    text: PropTypes.string,
    action: PropTypes.func,
    classes: PropTypes.object,
    inLine: PropTypes.bool,
    customClass: PropTypes.string,
    customScript: PropTypes.element,
    analyticsCategory: PropTypes.string,
    buttonName: PropTypes.string,
};

ShareLink.defaultProps = {
    target: '_blank',
    action: () => {},
    inLine: false,
    customClass: '',
    customScript: null,
};

export default withStyles(styles)(ShareLink);
