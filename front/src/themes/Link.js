import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import glamorous from 'glamorous';
import classnames from 'classnames';
import { routeMatch } from '../propTypes';
import { withRouter } from 'react-router';
import trackEvent from '../analytics/trackEvent';

import { black, yellow, white } from './colors';

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
    lineHeight: '40px',
    height: 40,
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    transition: 'opacity 0.25s ease',
    userSelect: 'none',
    cursor: 'pointer',
    '&.disabled': {
        opacity: 0.25,
        pointerEvents: 'none',
    },
    '&.white': {
        display: 'flex',
        backgroundColor: white,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: 16,
        textTransform: 'none',
        fontWeight: 'initial',
        paddingLeft: 55,
        textAlign: 'left',
    },
};

export class Link extends Component {
    componentDidMount() {
        const {
            label,
            disabled,
            analyticsCategory,
            buttonName,
            step,
            match: {
                params: { slug },
            },
        } = this.props;
        trackEvent(analyticsCategory, 'Display', 'button', buttonName, slug, step, {
            disabled: disabled ? 'disabled' : 'active',
            label,
        });
    }

    render() {
        const {
            to,
            label,
            disabled,
            className,
            onClick,
            analyticsCategory,
            buttonName,
            step,
            match: {
                params: { slug },
            },
            whiteLink,
        } = this.props;
        return (
            <RouterLink
                to={to}
                className={classnames(className, { disabled: disabled, white: whiteLink })}
                onClick={event => {
                    if (onClick) onClick(event);
                    trackEvent(analyticsCategory, 'Click', 'button', buttonName, slug, step, {
                        disabled: disabled ? 'disabled' : 'active',
                        label,
                    });
                }}
            >
                {label}
            </RouterLink>
        );
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    analyticsCategory: PropTypes.string,
    buttonName: PropTypes.string,
    step: PropTypes.string,
    match: routeMatch,
    whiteLink: PropTypes.bool,
};

Link.defaultProps = {
    whiteLink: false,
};

export default glamorous(withRouter(Link))(styles);
