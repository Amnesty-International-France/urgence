import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { InputAdornment } from '@material-ui/core';
import { green } from './colors';

const styles = {
    '& .check': {
        color: green,
        padding: 5,
    },
};

export const CheckAdornment = ({ className, isValid, ...props }) => {
    if (!isValid) {
        return null;
    }
    return (
        <InputAdornment position="end" className={className} {...props}>
            <span className="check">✓</span>
        </InputAdornment>
    );
};

CheckAdornment.propTypes = {
    className: PropTypes.string.isRequired,
    isValid: PropTypes.bool,
};

CheckAdornment.defaultProp = {
    isValid: true,
};

export default styled(CheckAdornment)(styles);
