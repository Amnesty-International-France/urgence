import React from 'react';
import styled from '@emotion/styled';

// @ts-expect-error TS(6142): Module '../icons/AmnestyLogo' was resolved to '/ho... Remove this comment to see the full error message
import AmnestyLogo from '../icons/AmnestyLogo';
// @ts-expect-error TS(6142): Module './ThemeContext' was resolved to '/home/gui... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={className}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
