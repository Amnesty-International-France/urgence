import React from 'react';
import { storiesOf } from '@storybook/react';

import StoryStep from './StoryStep';
import { WithStylesStory as Story } from './Story';
import Act from './Act';
import { black, yellow, pink, orange } from '../themes/colors';
import { routerDecorator, history } from '../../.storybook/decorators';

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
    .add('Top Picture, All Text Sizes', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep
                {...defaultStoryProps}
                content={`
                    <p>
                        Le 26 mars, une cour d'appel militaire a confirmé <span class="ql-size-large">la condamnation à mort</span> des deux hommes,
                        à l'issue d'un procès manifestement inique fondé sur des « aveux » extorqués sous la <span class="ql-size-huge">torture</span>
                        durant leur disparition forcée.
                    </p>
                `}
            />
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

storiesOf('Story', module)
    .addDecorator(routerDecorator)
    .add('Full Story', () => (
        <div style={{ height: '100vh' }}>
            <Story
                loading={false}
                history={history}
                match={{
                    params: {
                        id: '4ea88eef-18c7-47d7-90ab-cd160909268f',
                        page: 0,
                    },
                }}
                story={[
                    {
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
                                <span class="ql-size-large">Abdolfatah Soltani</span> est un avocat iranien
                                célèbre, spécialisé dans la défense des droits humains.
                            </p>
                        `,
                    },
                    {
                        displayOptions: {
                            mediumPosition: 'top',
                            backgroundColor: yellow,
                        },
                        content: `
                            <p>
                                Il se bat contre les <span class="ql-size-large">discriminations</span>, la <span class="ql-size-large">torture</span>
                                et les procès iniques, et participe à l'établissement d'un projet visant à faire <span class="ql-size-large">abroger
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
                            backgroundColor: orange,
                        },
                        content: `
                            <p>
                                En septembre 2011, il est emprisonné sur la base de <span class="ql-size-large">
                                fausses accusations</span> d'atteintes à la sécurité nationale.
                            </p>
                        `,
                    },
                    {
                        displayOptions: {
                            mediumPosition: 'top',
                            backgroundColor: pink,
                        },
                        content: `
                            <p>
                                Le 21 mars 2018, Abdolfattah Soltani entame une
                                <span class="ql-size-large">grève de la faim</span>.
                            </p>
                        `,
                    },
                ]}
            />
        </div>
    ));

storiesOf('Act', module)
    .addDecorator(routerDecorator)
    .add('Act', () => (
        <Act callToAction="<p>Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.</p>" />
    ));
