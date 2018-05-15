import React from 'react';
import { storiesOf } from '@storybook/react';

import { AmnestyCandle } from './AmnestyCandle';

storiesOf('Icons', module)
    .add('Amnesty Candle', () => <AmnestyCandle size={128} />);
