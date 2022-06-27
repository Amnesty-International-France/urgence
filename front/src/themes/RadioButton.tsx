import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { paramsType } from '../propTypes';
import trackEvent from '../analytics/trackEvent';
import withRouter from '../withRouter';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '15px 0',
    maxWidth: '400px',
    alignItems: 'center',
    '& .label': {
        width: '20%',
    },
    '& .warning': {
        color: 'red',
    },
    '& .item': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    '& .circle': {
        marginRight: '0.5em',
        fontSize: 20,
        height: '25px',
        width: '25px',
    },
};

export class RadioButton extends Component {
    state = {
        showError: false,
    };

    showErrorState = () => {
        if (!this.state.showError) this.setState({ showError: true });
    };

    render() {
        const {
            className,
            choices,
            label,
            name,
            value,
            onChange,
            error,
            analyticsCategory,
            params: { slug },
            step,
        } = this.props;

        const { showError } = this.state;
        return (
            <div className={className}>
                {label && (
                    <p className={classnames('label', { warning: showError && error })}>{label}</p>
                )}
                {choices.map((item, index) => {
                    return (
                        <div className="item" key={index}>
                            <input
                                type="radio"
                                name={name}
                                value={item}
                                checked={value === item}
                                id={index}
                                className="circle"
                                onChange={(event) => {
                                    this.showErrorState();
                                    if (onChange) onChange(event);
                                }}
                                onBlur={(event) => {
                                    this.showErrorState();
                                    trackEvent(
                                        analyticsCategory,
                                        'Exit',
                                        'field',
                                        label,
                                        slug,
                                        step,
                                        {
                                            state: error ? 'invalid' : 'valid',
                                            value: event.target.value,
                                        },
                                    );
                                }}
                                onFocus={(event) => {
                                    trackEvent(
                                        analyticsCategory,
                                        'Click',
                                        'field',
                                        label,
                                        slug,
                                        step,
                                        {
                                            state: error ? 'invalid' : 'valid',
                                            value: event.target.value,
                                        },
                                    );
                                }}
                            />
                            <label htmlFor={index}>{item}</label>
                        </div>
                    );
                })}
            </div>
        );
    }
}

RadioButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    choices: PropTypes.array.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    params: paramsType,
};

export default withRouter(styled(RadioButton)(styles));
