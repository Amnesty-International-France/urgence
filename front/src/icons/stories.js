import React from 'react';
import { storiesOf } from '@storybook/react';

import AmnestyCandle from './AmnestyCandle';
import RightArrow from './RightArrow';

storiesOf('Icons', module)
    .addDecorator(story => <div style={{ fontSize: 128 }}>{story()}</div>)
    .add('Amnesty Candle', () => <AmnestyCandle />)
    .add('Right Arrow', () => <RightArrow />);
