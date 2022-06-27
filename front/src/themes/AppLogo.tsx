import React from 'react';
import styled from '@emotion/styled';

import AmnestyLogo from '../icons/AmnestyLogo';
import { withThemeContext } from './ThemeContext';

const styles = {
    position: 'absolute',
    fontSize: 33,
    top: 80,
    left: 0,
    zIndex: 100,
};

type Props = {
    className?: string;
    context: {
        backgroundColor?: string;
        logoColor?: string;
        logoBackgroundColor?: string;
    };
};

export const AppLogo = ({ className, context }: Props) => (
    <div className={className}>
        <AmnestyLogo
            fill0={context.logoBackgroundColor}
            fill1={context.logoColor}
            width="122"
            height="49"
        />
    </div>
);

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(withThemeContext(AppLogo))(styles);
