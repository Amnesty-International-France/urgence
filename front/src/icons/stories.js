import React from 'react';
import { storiesOf } from '@storybook/react';

import AmnestyCandle from './AmnestyCandle';
import AmnestyLogo from './AmnestyLogo';
import RightArrow from './RightArrow';

import { black, yellow } from '../themes/colors';

storiesOf('Icons', module)
    .addDecorator(story => <div style={{ fontSize: 128 }}>{story()}</div>)
    .add('Amnesty Candle', () => <AmnestyCandle />)
    .add('Amnesty Logo Black', () => <AmnestyLogo fill0={black} fill1={yellow} />)
    .add('Amnesty Logo Yellow', () => <AmnestyLogo fill0={yellow} fill1={black} />)
    .add('Right Arrow', () => <RightArrow />);
