import React from 'react';
import { storiesOf } from '@storybook/react';

import StoryStep from './StoryStep';
import {
    dustyOrange,
    tomato,
    darkHotPink,
    brightYellow,
} from '../themes/colors';
import Story from './Story';

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

storiesOf('Story', module).add('Full Story', () => (
    <Story
        story={[
            {
                medium: {
                    src: '/img/abdolfatah-soltani.jpg',
                    title: 'Abdolfatah Soltani',
                },
                displayOptions: {
                    mediumPosition: 'top',
                    backgroundColor: dustyOrange,
                },
                content: `
                    <p>
                        <span style="font-size: 36px;">Abdolfatah Soltani</span> est un avocat iranien
                        célèbre, spécialisé dans la défense des droits humains.
                    </p>
                `,
            },
            {
                displayOptions: {
                    mediumPosition: 'top',
                    backgroundColor: brightYellow,
                },
                content: `
                    <p>
                        Il se bat contre les <span style="font-size: 36px;">discriminations</span>, la <span style="font-size: 36px;">torture</span>
                        et les procès iniques, et participe à l'établissement d'un projet visant à faire <span style="font-size: 36px;">abroger
                        la peine de mort en Iran</span>.
                    </p>
                `,
            },
            {
                medium: {
                    src: '/img/old-jail.jpg',
                    title: 'Jail',
                },
                displayOptions: {
                    mediumPosition: 'bottom',
                    backgroundColor: tomato,
                },
                content: `
                    <p>
                        En septembre 2011, il est emprisonné sur la base de <span style="font-size: 36px;">
                        fausses accusations</span> d'atteintes à la sécurité nationale.
                    </p>
                `,
            },
            {
                displayOptions: {
                    mediumPosition: 'top',
                    backgroundColor: darkHotPink,
                },
                content: `
                    <p>
                        Le 21 mars 2018, Abdolfattah Soltani entame une
                        <span style="font-size: 36px;">grève de la faim</span>.
                    </p>
                `,
            },
        ]}
    />
));
