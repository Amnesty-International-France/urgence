import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Div100Vh from 'react-div-100vh';

import StoryStep from './story/StoryStep';
import { WithStylesStory as Story } from './story/Story';
import Act from './Act';
import ThankStep from './ThankStep';
import Link from '../themes/Link';
import { routerDecorator, history } from '../../.storybook/decorators';
import { ThemeProvider } from '../themes/ThemeContext';
import AppLogo from '../themes/AppLogo';

const defaultStoryProps = {
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
            <StoryStep
                medium={{
                    src: '/img/abdolfatah-soltani.jpg',
                    title: 'Abdolfatah Soltani',
                }}
                content={`
        <p>
                Le 26 mars, une cour d'appel militaire a confirmé <span class="ql-size-large">la condamnation à mort</span> des deux hommes,
                à l'issue d'un procès manifestement inique fondé sur des « aveux » extorqués sous la torture durant leur disparition forcée.
        </p>
    `}
            />
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
            <StoryStep {...defaultStoryProps} />
        </div>
    ))
    .add('Top Picture, Pink Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep {...defaultStoryProps} />
        </div>
    ))
    .add('No Picture, Yellow Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep {...defaultStoryProps} />
        </div>
    ))
    .add('Bottom Picture, Black Background', () => (
        <div style={{ height: '100vh' }}>
            <StoryStep {...defaultStoryProps} />
        </div>
    ));

storiesOf('Story', module)
    .addDecorator(routerDecorator)
    .add('Full Story', () => (
        <div style={{ height: '100vh' }}>
            <Story
                context={{
                    changeLogoColor: action('Changing logo color'),
                }}
                loading={false}
                history={history}
                match={{
                    params: {
                        id: '4ea88eef-18c7-47d7-90ab-cd160909268f',
                        slug: 'you-are-my-only-hope',
                        page: 0,
                    },
                }}
                story={[
                    {
                        medium: {
                            src: '/img/abdolfatah-soltani.jpg',
                            title: 'Abdolfatah Soltani',
                        },
                        content: `
                            <p>
                                <span class="ql-size-large">Abdolfatah Soltani</span> est un avocat iranien
                                célèbre, spécialisé dans la défense des droits humains.
                            </p>
                        `,
                    },
                    {
                        content: `
                            <p>
                                Il se bat contre les <span class="ql-size-large">discriminations</span>, la <span class="ql-size-large">torture</span>
                                et les procès iniques, et participe à l'établissement d'un projet visant à faire <span class="ql-size-large">abroger
                                la peine de mort en Iran</span>.
                            </p>
                        `,
                    },
                    {
                        content: `
                            <p>
                                En septembre 2011, il est emprisonné sur la base de <span class="ql-size-large">
                                fausses accusations</span> d'atteintes à la sécurité nationale.
                            </p>
                        `,
                    },
                    {
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
    .add('Act Screen', () => {
        const data = {
            title: 'Vous avez plus de pouvoir que vous ne le pensez !',
            message: `<p>Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.</p>`,
            button: `Voir l'email`,
        };

        return (
            <ThemeProvider>
                <Div100Vh>
                    <AppLogo />
                    <Act
                        data={data}
                        actions={() => (
                            <Link to="#" label={data.button} onClick={action('Link clicked')} />
                        )}
                    />
                </Div100Vh>
            </ThemeProvider>
        );
    });

storiesOf('Thanks', module)
    .addDecorator(routerDecorator)
    .add('Thanks Screen', () => {
        const data = {
            title: 'Se battre.\nEncore.\nEt Encore.',
            text: "Pour aller plus loin, vous pouvez envoyer une lettre à l'ambassade d'Égypte ou partager cette histoire avec vos amis.",
            button: "Je continue d'agir",
        };

        return (
            <ThemeProvider>
                <Div100Vh>
                    <AppLogo />
                    <ThankStep data={data} />
                </Div100Vh>
            </ThemeProvider>
        );
    })
    .add('Thanks Screen Final', () => {
        const data = {
            title: 'Merci\npour votre\naction.',
            text: "La lettre vous a été envoyée sur votre boîte e-mail. Poursuivez votre action en l'envoyant par La Poste.",
        };

        return (
            <ThemeProvider>
                <Div100Vh>
                    <AppLogo />
                    <ThankStep data={data} />
                </Div100Vh>
            </ThemeProvider>
        );
    });
