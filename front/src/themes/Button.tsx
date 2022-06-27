import React from 'react';
import styled from '@emotion/styled';

import { black, yellow, grey, darkGrey } from './colors';

const StyledButton = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Amnesty Trade Gothic Condensed',
    fontWeight: 'bold',
    fontSize: '26px',
    padding: '0 1em',
    lineHeight: '42px',
    minWidth: '42px',
    width: '100%',
    height: '42px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    textAlign: 'center',
    boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: yellow,
    color: black,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.25s ease',
    ':disabled': {
        backgroundColor: grey,
        color: darkGrey,
        pointerEvents: 'none',
    },
});

type Props = {
    label: string;
    className?: string;
    disabled?: boolean;
    onClick?: (...args: any[]) => any;
};

export const Button = ({ label, onClick, className, disabled }: Props) => (
    <StyledButton className={className} onClick={onClick} disabled={disabled}>
        {label.toUpperCase()}
    </StyledButton>
);
