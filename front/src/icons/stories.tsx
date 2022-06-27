import React from 'react';
import { storiesOf } from '@storybook/react';

// @ts-expect-error TS(6142): Module './AmnestyCandle' was resolved to '/home/gu... Remove this comment to see the full error message
import AmnestyCandle from './AmnestyCandle';
// @ts-expect-error TS(6142): Module './AmnestyLogo' was resolved to '/home/guil... Remove this comment to see the full error message
import AmnestyLogo from './AmnestyLogo';

import { black, yellow } from '../themes/colors';

storiesOf('Icons', module)
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    .addDecorator((story) => <div style={{ fontSize: 128 }}>{story()}</div>)
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    .add('Amnesty Candle', () => <AmnestyCandle />)
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    .add('Amnesty Logo Black', () => <AmnestyLogo fill0={black} fill1={yellow} />)
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    .add('Amnesty Logo Yellow', () => <AmnestyLogo fill0={yellow} fill1={black} />);
