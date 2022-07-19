import React from 'react';
import styled from '@emotion/styled';

import { withThemeContext } from 'amnesty-components';

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
    <div className={className}>
        <Rectangle color={context.backgroundColor} />
        <Triangle color={context.backgroundColor} />
    </div>
);

export default withThemeContext(AppBackground);
