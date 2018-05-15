import React from 'react';
import { storiesOf } from '@storybook/react';

import StoryStep from './StoryStep';
import Story from './Story';
import { black, yellow, pink } from '../themes/colors';

const defaultStoryProps = {
    medium: {
        src: '/img/abdolfatah-soltani.jpg',
        title: 'Abdolfatah Soltani',
    },
    displayOptions: {
        mediumPosition: 'top',
        backgroundColor: black,
    },
    content: `
        <p>
            Le 26 mars, une cour d'appel militaire a confirmé <span class="ql-size-large">la condamnation à mort</span> des deux hommes,
            à l'issue d'un procès manifestement inique fondé sur des « aveux » extorqués sous la torture durant leur disparition forcée.
        </p>
    `,
};

storiesOf('Story Step', module)
    .add('Top Picture, Black Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep {...defaultStoryProps} />
        </div>
    ))
    .add('Top Picture, Yellow Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep
                {...defaultStoryProps}
                displayOptions={{
                    ...defaultStoryProps.displayOptions,
                    backgroundColor: yellow,
                }}
            />
        </div>
    ))
    .add('Top Picture, Pink Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep
                {...defaultStoryProps}
                displayOptions={{
                    ...defaultStoryProps.displayOptions,
                    backgroundColor: pink,
                }}
            />
        </div>
    ))
    .add('No Picture, Yellow Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep
                {...defaultStoryProps}
                medium={null}
                displayOptions={{
                    ...defaultStoryProps.displayOptions,
                    backgroundColor: yellow,
                }}
            />
        </div>
    ))
    .add('Bottom Picture, Black Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep
                {...defaultStoryProps}
                displayOptions={{
                    ...defaultStoryProps.displayOptions,
                    mediumPosition: 'bottom',
                }}
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
