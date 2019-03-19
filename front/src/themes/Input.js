import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TextField from '@material-ui/core/TextField';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    width: '100%',
    fontSize: 14,
    minHeight: 50,
    '& > div > fieldset ': { borderRadius: 0 },
};

export const Input_old = ({ className, ...otherProps }) => (
    <TextField variant="outlined" margin="normal" className={className} {...otherProps} />
);

export class Input extends Component {
    state = {
        showError: false,
    };

    setShowErrorState = () => {
        if (!this.state.showError) this.setState({ showError: true });
    };

    render() {
        const { className, value, onChange, error, ...otherProps } = this.props;
        const { showError } = this.state;
        return (
            <TextField
                variant="outlined"
                margin="normal"
                className={className}
                error={showError && error}
                onChange={event => {
                    this.setShowErrorState();
                    if (onChange) onChange(event);
                }}
                onBlur={() => this.setShowErrorState()}
                value={value}
                {...otherProps}
            />
        );
    }
}

Input.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    className: PropTypes.string,
};

export default glamorous(Input)(styles);
