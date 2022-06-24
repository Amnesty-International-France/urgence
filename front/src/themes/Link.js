import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { routeMatch } from '../propTypes';
import trackEvent from '../analytics/trackEvent';

import { black, white, grey, darkGrey } from './colors';

export const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Amnesty Trade Gothic Condensed',
    fontWeight: 'bold',
    fontSize: '26px',
    padding: '0 1em',
    lineHeight: '42px',
    minWidth: '42px',
    width: '100%',
    height: '42px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: black,
    color: white,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.25s ease',
    '.disabled': {
        backgroundColor: grey,
        color: darkGrey,
        pointerEvents: 'none',
    },
    '.white': {
        display: 'flex',
        backgroundColor: white,
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: '18px',
        textTransform: 'none',
        fontWeight: 'initial',
        paddingLeft: '55px',
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
                onClick={(event) => {
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

export default styled(Link)(styles);
