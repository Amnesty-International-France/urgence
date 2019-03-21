import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';
import { routeMatch } from '../propTypes';
import { withRouter } from 'react-router';
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
    '& .valid div:after': {
        position: 'absolute',
        right: 0,
        content: '✓',
        color: 'green',
        paddingRight: 5,
    },
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
            value,
            onChange,
            error,
            noValidate,
            analyticsCategory,
            match,
            step,
            staticContext,
            ...otherProps
        } = this.props;
        const { showError, showValid } = this.state;

        if (!noValidate) this.showValidState(!error);
        return (
            <div className={className}>
                <TextField
                    className={classnames('textfield', { ['valid']: showValid })}
                    variant="outlined"
                    margin="dense"
                    error={showError && error}
                    onChange={event => {
                        if (onChange) onChange(event);
                        this.showErrorState();
                    }}
                    onBlur={event => {
                        this.showErrorState();
                        trackEvent(
                            analyticsCategory,
                            'Exit',
                            'field',
                            this.props.label,
                            match.params.id,
                            step,
                            {
                                state: showValid ? 'valid' : error ? 'invalid' : 'null',
                                value: event.target.value,
                            },
                        );
                    }}
                    onFocus={event => {
                        trackEvent(
                            analyticsCategory,
                            'Enter',
                            'field',
                            this.props.label,
                            match.params.id,
                            step,
                            {
                                state: showValid ? 'valid' : error ? 'invalid' : 'null',
                                value: event.target.value,
                            },
                        );
                    }}
                    value={value}
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
