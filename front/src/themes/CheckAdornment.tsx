import React from 'react';
import styled from '@emotion/styled';
import { InputAdornment } from '@mui/material';
import { green } from './colors';

const styles = {
    '& .check': {
        color: green,
        padding: 5,
    },
};

type Props = {
    className: string;
    isValid?: boolean;
};

export const CheckAdornment = ({ className, isValid, ...props }: Props) => {
    if (!isValid) {
        return null;
    }
    return (
        <InputAdornment position="end" className={className} {...props}>
            <span className="check">✓</span>
        </InputAdornment>
    );
};

CheckAdornment.defaultProp = {
    isValid: true,
};

export default styled(CheckAdornment)(styles);
