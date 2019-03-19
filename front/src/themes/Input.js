import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';
import GoogleAnalytics from 'react-ga';

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
            ...otherProps
        } = this.props;
        const { showError, showValid } = this.state;

        if (!noValidate) this.showValidState(!error);

        return (
            <div className={className}>
                <TextField
                    className={classnames('textfield', { ['valid']: showValid })}
                    variant="outlined"
                    margin="normal"
                    error={showError && error}
                    onChange={event => {
                        if (onChange) onChange(event);
                        this.showErrorState();
                    }}
                    onBlur={event => {
                        this.showErrorState();
                        if (analyticsCategory) {
                            GoogleAnalytics.event({
                                category: analyticsCategory,
                                action: `Exit field: ${this.props.label}`,
                                label: `User remove focus on field: ${
                                    this.props.label
                                } with state: ${
                                    showValid ? 'valid' : error ? 'invalid' : 'null'
                                }, containing value: "${event.target.value}"`,
                            });
                        }
                    }}
                    onFocus={event => {
                        if (analyticsCategory) {
                            GoogleAnalytics.event({
                                category: analyticsCategory,
                                action: `Enter field: ${this.props.label}`,
                                label: `User set focus on field: ${this.props.label} with state: ${
                                    showValid ? 'valid' : error ? 'invalid' : 'null'
                                }, containing value: "${event.target.value}"`,
                            });
                        }
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
};

export default glamorous(Input)(styles);
