import React, { Component } from 'react';
import styled from '@emotion/styled';

import { TextField } from '@material-ui/core';
import { paramsType } from '../propTypes';

// @ts-expect-error TS(6142): Module './CheckAdornment' was resolved to '/home/g... Remove this comment to see the full error message
import CheckAdornment from './CheckAdornment';
import trackEvent from '../analytics/trackEvent';
// @ts-expect-error TS(6142): Module '../withRouter' was resolved to '/home/guil... Remove this comment to see the full error message
import withRouter from '../withRouter';

const styles = {
    '& .textfield': {
        fontFamily: 'Amnesty Trade Gothic',
        width: '100%',
        fontSize: 14,
        minHeight: 50,
        '& div > fieldset': {
            borderRadius: 0,
        },
    },
};

const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isCorrectEmail = (email: any) => {
    return re.test(email);
};

const regexPhone = /^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/;
export const isCorrectPhone = (phoneNumber: any) => {
    return regexPhone.test(phoneNumber);
};

type InputProps1 = {
    analyticsCategory?: string;
    className?: string;
    error?: boolean;
    helperText?: string;
    label: string;
    // @ts-expect-error TS(2749): 'paramsType' refers to a value, but is being used ... Remove this comment to see the full error message
    params?: paramsType;
    noValidate?: boolean;
    onChange?: (...args: any[]) => any;
    staticContext?: any;
    step?: string;
    value: string;
};

type InputState1 = any;

export class Input extends Component<InputProps1, InputState1> {
    state = {
        showError: false,
        showValid: false,
    };

    componentDidMount() {
        if (!this.props.noValidate) this.showValidState(!this.props.error);
    }

    showErrorState = () => {
        if (!this.state.showError) this.setState({ showError: true });
    };

    showValidState = (value: any) => {
        if (this.state.showValid !== value) this.setState({ showValid: value });
    };

    render() {
        const {
            analyticsCategory,
            className,
            error,
            helperText,
            label,
            noValidate,
            onChange,
            staticContext,
            step,
            params: { slug },
            value,
            ...otherProps
        } = this.props;
        const { showError, showValid } = this.state;
        if (!noValidate) {
            this.showValidState(!error);
        }

        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={className}>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TextField
                    className="textfield"
                    variant="outlined"
                    margin="dense"
                    label={label}
                    value={value}
                    error={showError && error}
                    helperText={error ? helperText : ''}
                    InputProps={{
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        endAdornment: <CheckAdornment isValid={showValid} />,
                    }}
                    onChange={(event) => {
                        if (onChange) onChange(event);
                        this.showErrorState();
                    }}
                    onBlur={(event) => {
                        this.showErrorState();
                        trackEvent(analyticsCategory, 'Exit', 'field', label, slug, step, {
                            state: showValid ? 'valid' : error ? 'invalid' : 'null',
                            value: event.target.value,
                        });
                    }}
                    onFocus={(event) => {
                        trackEvent(analyticsCategory, 'Enter', 'field', label, slug, step, {
                            state: showValid ? 'valid' : error ? 'invalid' : 'null',
                            value: event.target.value,
                        });
                    }}
                    {...otherProps}
                />
            </div>
        );
    }
}

export default withRouter(styled(Input)(styles));
