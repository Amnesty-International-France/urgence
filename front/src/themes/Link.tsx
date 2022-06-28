import styled from '@emotion/styled';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import trackEvent from '../analytics/trackEvent';
import withRouter from '../withRouter';
import { black, darkGrey, grey, white } from './colors';

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

type OwnProps = {
    to: string;
    label?: string | React.ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: (...args: any[]) => any;
    analyticsCategory?: string;
    buttonName?: string;
    step?: string;
    // @ts-expect-error TS(2749): 'paramsType' refers to a value, but is being used ... Remove this comment to see the full error message
    params?: paramsType;
    whiteLink?: boolean;
};

type Props = OwnProps & typeof Link.defaultProps;

export class Link extends Component<Props> {
    static defaultProps = {
        whiteLink: false,
    };

    componentDidMount() {
        const { label, disabled, analyticsCategory, buttonName, step, params } = this.props;
        trackEvent(analyticsCategory, 'Display', 'button', buttonName, params.slug, step, {
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
            params: { slug },
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

// @ts-expect-error TS(2769): No overload matches this call.
export default withRouter(styled(Link)(styles));
