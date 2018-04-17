import React from 'react';
import { storiesOf } from '@storybook/react';

import App from '../App';
import Title from '../themes/Title';

storiesOf('App', module).add('default', () => <App />);
storiesOf('Title', module).add('Home title', () => <Title>Home</Title>);
