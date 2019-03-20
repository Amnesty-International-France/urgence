import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import glamorous from 'glamorous';
import classnames from 'classnames';
import { trackEvent } from '../analytics/withTracker';

import { black, yellow } from './colors';

export const styles = {
    display: 'block',
    '@media (min-width: 1024px)': {
        display: 'inline-block',
    },
    backgroundColor: yellow,
    color: black,
    padding: '0 0.5em',
    fontFamily: 'Amnesty Trade Gothic Condensed',
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: '42px',
    height: 42,
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    transition: 'opacity 0.25s ease',
    '&.disabled': {
        opacity: 0.25,
        pointerEvents: 'none',
    },
};

export const Link = ({
    to,
    label,
    disabled,
    className,
    onClick,
    analyticsCategory,
    buttonName,
}) => (
    <RouterLink
        to={to}
        className={classnames(className, { disabled: disabled })}
        onClick={event => {
            if (onClick) onClick(event);
            trackEvent(analyticsCategory, 'Click', 'button', buttonName, {
                disabled: disabled ? 'disabled' : 'active',
                label,
            });
        }}
    >
        {label}
    </RouterLink>
);

Link.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    analyticsCategory: PropTypes.string,
    buttonName: PropTypes.string,
};

export default glamorous(Link)(styles);
