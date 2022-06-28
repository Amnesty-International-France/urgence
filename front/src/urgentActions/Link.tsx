import React from 'react';
import styled from '@emotion/styled';
import { black } from '../themes/colors';

const styles = {
    textAlign: 'center',
    '@media (min-width: 1024px)': {
        textAlign: 'right',
        marginRight: '1rem',
    },
    '& a': {
        fontSize: '1rem',
    },
};

type OwnProps = {
    className?: string;
    color?: string;
    url: string;
    label?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Link.defaultProps;

// @ts-expect-error TS(7022): 'Link' implicitly has type 'any' because it does n... Remove this comment to see the full error message
export const Link = ({ className, color, url, label }: Props) => (
    <div className={`link ${className}`}>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color }}>
            {label || url}
        </a>
    </div>
);

Link.defaultProps = {
    color: black,
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(Link)(styles);
