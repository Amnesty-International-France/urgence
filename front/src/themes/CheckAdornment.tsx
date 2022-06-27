import React from 'react';
import styled from '@emotion/styled';
import { InputAdornment } from '@material-ui/core';
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InputAdornment position="end" className={className} {...props}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <span className="check">✓</span>
        </InputAdornment>
    );
};

CheckAdornment.defaultProp = {
    isValid: true,
};

export default styled(CheckAdornment)(styles);
