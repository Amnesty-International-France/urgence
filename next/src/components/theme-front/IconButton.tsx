import React from 'react';
import { black, darkGrey, grey, yellow } from '@/components/themes/colors';

import styled from '@emotion/styled';

const IconButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 0.5em',
    width: '42px',
    height: '42px',
    boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: yellow,
    color: black,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    transition: 'background-color 0.25s ease',
    '&:disabled': {
        backgroundColor: grey,
        color: darkGrey,
        pointerEvents: 'none',
    },
    '&.transparent': {
        backgroundColor: 'transparent',
        color: darkGrey,
        boxShadow: 'none',
    },
});

type OwnProps = {
    className?: string;
    children: React.ReactElement;
    onClick: (...args: any[]) => any;
    onMouseEnter?: (...args: any[]) => any;
    onMouseLeave?: (...args: any[]) => any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof IconButton.defaultProps;

// @ts-expect-error TS(7022): 'IconButton' implicitly has type 'any' because it ... Remove this comment to see the full error message
const IconButton = ({ className, children, onClick, onMouseEnter, onMouseLeave }: Props) => (
    <IconButtonContainer
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {children}
    </IconButtonContainer>
);

IconButton.defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
};

export default IconButton;
