import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { TextField } from '@material-ui/core';
import { routeMatch } from '../propTypes';
import { withRouter } from 'react-router';

import CheckAdornment from './CheckAdornment';
import trackEvent from '../analytics/trackEvent';

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

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isCorrectEmail = email => {
    return re.test(email);
};

const regexPhone = /^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/;
export const isCorrectPhone = phoneNumber => {
    return regexPhone.test(phoneNumber);
};

export class Input extends Component {
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

    showValidState = value => {
        if (this.state.showValid !== value) this.setState({ showValid: value });
    };

    render() {
        const {
            analyticsCategory,
            className,
            error,
            helperText,
            label,
            match: { params: slug },
            noValidate,
            onChange,
            staticContext,
            step,
            value,
            ...otherProps
        } = this.props;
        const { showError, showValid } = this.state;

        if (!noValidate) {
            this.showValidState(!error);
        }

        return (
            <div className={className}>
                <TextField
                    className="textfield"
                    variant="outlined"
                    margin="dense"
                    label={label}
                    value={value}
                    error={showError && error}
                    helperText={error ? helperText : ''}
                    InputProps={{
                        endAdornment: <CheckAdornment isValid={showValid} />,
                    }}
                    onChange={event => {
                        if (onChange) onChange(event);
                        this.showErrorState();
                    }}
                    onBlur={event => {
                        this.showErrorState();
                        trackEvent(analyticsCategory, 'Exit', 'field', label, slug, step, {
                            state: showValid ? 'valid' : error ? 'invalid' : 'null',
                            value: event.target.value,
                        });
                    }}
                    onFocus={event => {
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

Input.propTypes = {
    analyticsCategory: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    match: routeMatch,
    noValidate: PropTypes.bool,
    onChange: PropTypes.func,
    staticContext: PropTypes.object,
    step: PropTypes.string,
    value: PropTypes.string.isRequired,
};

export default glamorous(withRouter(Input))(styles);
