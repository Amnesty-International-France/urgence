import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { TextField } from '@material-ui/core';
import { routeMatch } from '../propTypes';
import { withRouter } from 'react-router';

import trackEvent from '../analytics/trackEvent';
import CheckAdornment from './CheckAdornment';

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
            className,
            label,
            value,
            onChange,
            error,
            noValidate,
            analyticsCategory,
            match: { params: slug },
            step,
            staticContext,
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
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    noValidate: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    match: routeMatch,
    staticContext: PropTypes.object,
};

export default glamorous(withRouter(Input))(styles);
