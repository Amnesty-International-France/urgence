import styled from '@emotion/styled';
import classnames from 'classnames';
import { Component } from 'react';
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

type Props = {
    className?: string;
    label?: string;
    value?: string;
    name?: string;
    onChange?: (...args: any[]) => any;
    error?: boolean;
    choices: any[];
    analyticsCategory?: string;
    step?: string;
    // @ts-expect-error TS(2749): 'paramsType' refers to a value, but is being used ... Remove this comment to see the full error message
    params?: paramsType;
};

type State = any;

export class RadioButton extends Component<Props, State> {
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
                                // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
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
                            <label htmlFor={index.toString()}>{item}</label>
                        </div>
                    );
                })}
            </div>
        );
    }
}

// @ts-expect-error TS(2769): No overload matches this call.
export default withRouter(styled(RadioButton)(styles));
