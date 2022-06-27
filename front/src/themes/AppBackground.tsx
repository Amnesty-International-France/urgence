import React from 'react';
import styled from '@emotion/styled';

// @ts-expect-error TS(6142): Module './ThemeContext' was resolved to '/home/gui... Remove this comment to see the full error message
import { withThemeContext } from './ThemeContext';

const Rectangle = styled('div')(
    {
        zIndex: -1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '30vh',
    },
    ({ color }) => ({
        backgroundColor: color,
    }),
);

const Triangle = styled('div')(
    {
        zIndex: -1,
        position: 'fixed',
        top: '30vh',
        left: 0,
        width: 0,
        height: 0,
        borderRight: '100vw solid transparent',
    },
    ({ color }) => ({
        borderTop: `50vh solid ${color}`,
    }),
);

type Props = {
    className?: string;
    context: {
        backgroundColor?: string;
        logoColor?: string;
        logoBackgroundColor?: string;
    };
};

export const AppBackground = ({ className, context }: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={className}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Rectangle color={context.backgroundColor} />
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Triangle color={context.backgroundColor} />
    </div>
);

export default withThemeContext(AppBackground);
