import React from 'react';
import { storiesOf } from '@storybook/react';

import AmnestyCandle from './AmnestyCandle';
import AmnestyLogo from 'amnesty-components';

import { black, yellow } from 'amnesty-components';

storiesOf('Icons', module)
    .addDecorator((story) => <div style={{ fontSize: 128 }}>{story()}</div>)
    .add('Amnesty Candle', () => <AmnestyCandle />)
    //@ts-ignore
    .add('Amnesty Logo Black', () => <AmnestyLogo fill0={black} fill1={yellow} />)
    //@ts-ignore
    .add('Amnesty Logo Yellow', () => <AmnestyLogo fill0={yellow} fill1={black} />);
