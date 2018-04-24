import React from 'react';
import { storiesOf } from '@storybook/react';

import StoryStep from './StoryStep';
import { dustyOrange } from '../themes/colors';

storiesOf('Story Step', module).add('With Top Picture', () => (
    <div style={{ maxWidth: 360, height: '100vh', maxHeight: 540 }}>
        <StoryStep
            medium={{
                src: '/abdolfatah-soltani.jpg',
                title: 'Abdolfatah Soltani',
            }}
            displayOptions={{
                position: 'top',
                backgroundColor: dustyOrange,
            }}
            content={`
                <p>
                    <span style="font-size: 36px;">Abdolfatah Soltani</span> est un avocat iranien
                    célèbre, spécialisé dans la défense des droits humains.
                </p>
            `}
        />
    </div>
));
