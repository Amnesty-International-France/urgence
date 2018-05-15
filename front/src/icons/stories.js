import React from 'react';
import { storiesOf } from '@storybook/react';

import { AmnestyCandle } from './AmnestyCandle';
import { RightArrow } from './RightArrow';

storiesOf('Icons', module)
    .add('Amnesty Candle', () => <AmnestyCandle size={128} />)
    .add('Right Arrow', () => <RightArrow size={128} />);
