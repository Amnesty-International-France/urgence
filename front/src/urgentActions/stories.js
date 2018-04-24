import React from 'react';
import { storiesOf } from '@storybook/react';

import StoryStep from './StoryStep';
import { dustyOrange, tomato, darkHotPink } from '../themes/colors';

storiesOf('Story Step', module)
    .add('With Top Picture', () => (
        <div style={{ maxWidth: 360, height: '100vh', maxHeight: 540 }}>
            <StoryStep
                medium={{
                    src: '/img/abdolfatah-soltani.jpg',
                    title: 'Abdolfatah Soltani',
                }}
                displayOptions={{
                    mediumPosition: 'top',
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
    ))
    .add('With Bottom Picture', () => (
        <div style={{ maxWidth: 360, height: '100vh', maxHeight: 540 }}>
            <StoryStep
                medium={{
                    src: '/img/old-jail.jpg',
                    title: 'Jail',
                }}
                displayOptions={{
                    mediumPosition: 'bottom',
                    backgroundColor: tomato,
                }}
                content={`
                    <p>
                        En septembre 2011, il est emprisonné sur la base de <span style="font-size: 36px;">
                        fausses accusations</span> d'atteintes à la sécurité nationale.
                    </p>
                `}
            />
        </div>
    ))
    .add('Without Picture', () => (
        <div style={{ maxWidth: 360, height: '100vh', maxHeight: 540 }}>
            <StoryStep
                displayOptions={{
                    mediumPosition: 'top',
                    backgroundColor: darkHotPink,
                }}
                content={`
                    <p>
                        Le 21 mars 2018, Abdolfattah Soltani entame une
                        <span style="font-size: 36px;">grève de la faim</span>.
                    </p>
                `}
            />
        </div>
    ));
