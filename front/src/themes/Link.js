import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import glamorous from 'glamorous';
import classnames from 'classnames';
import { routeMatch } from '../propTypes';
import { withRouter } from 'react-router';
import trackEvent from '../analytics/trackEvent';

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

export class Link extends Component {
    componentDidMount() {
        const { label, disabled, analyticsCategory, buttonName, step, match } = this.props;
        trackEvent(analyticsCategory, 'Display', 'button', buttonName, match.params.id, step, {
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
            match,
        } = this.props;
        return (
            <RouterLink
                to={to}
                className={classnames(className, { disabled: disabled })}
                onClick={event => {
                    if (onClick) onClick(event);
                    trackEvent(
                        analyticsCategory,
                        'Click',
                        'button',
                        buttonName,
                        match.params.id,
                        step,
                        {
                            disabled: disabled ? 'disabled' : 'active',
                            label,
                        },
                    );
                }}
            >
                {label}
            </RouterLink>
        );
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    analyticsCategory: PropTypes.string,
    buttonName: PropTypes.string,
    step: PropTypes.string,
    match: routeMatch,
};

export default glamorous(withRouter(Link))(styles);
