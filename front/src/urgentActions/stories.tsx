import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Div100Vh from 'react-div-100vh';

// @ts-expect-error TS(6142): Module './story/StoryStep' was resolved to '/home/... Remove this comment to see the full error message
import StoryStep from './story/StoryStep';
// @ts-expect-error TS(6142): Module './story/Story' was resolved to '/home/guil... Remove this comment to see the full error message
import { WithStylesStory as Story } from './story/Story';
// @ts-expect-error TS(6142): Module './Act' was resolved to '/home/guillaume/de... Remove this comment to see the full error message
import Act from './Act';
// @ts-expect-error TS(6142): Module './ThankStep' was resolved to '/home/guilla... Remove this comment to see the full error message
import ThankStep from './ThankStep';
// @ts-expect-error TS(6142): Module '../themes/Link' was resolved to '/home/gui... Remove this comment to see the full error message
import Link from '../themes/Link';
// @ts-expect-error TS(7016): Could not find a declaration file for module '../.... Remove this comment to see the full error message
import { routerDecorator, history } from '../../.storybook/decorators';
// @ts-expect-error TS(6142): Module '../themes/ThemeContext' was resolved to '/... Remove this comment to see the full error message
import { ThemeProvider } from '../themes/ThemeContext';
// @ts-expect-error TS(6142): Module '../themes/AppLogo' was resolved to '/home/... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ height: '100vh' }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <StoryStep
                // @ts-expect-error TS(2322): Type '{ medium: { src: string; title: string; }; c... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ height: '100vh' }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <StoryStep
                {...defaultStoryProps}
                // @ts-expect-error TS(2322): Type '{ content: string; }' is not assignable to t... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ height: '100vh' }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <StoryStep {...defaultStoryProps} />
        </div>
    ))
    .add('Top Picture, Pink Background', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ height: '100vh' }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <StoryStep {...defaultStoryProps} />
        </div>
    ))
    .add('No Picture, Yellow Background', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ height: '100vh' }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <StoryStep {...defaultStoryProps} />
        </div>
    ))
    .add('Bottom Picture, Black Background', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ height: '100vh' }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <StoryStep {...defaultStoryProps} />
        </div>
    ));

storiesOf('Story', module)
    .addDecorator(routerDecorator)
    .add('Full Story', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div style={{ height: '100vh' }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Story
                context={{
                    changeLogoColor: action('Changing logo color'),
                }}
                // @ts-expect-error TS(2322): Type '{ context: { changeLogoColor: HandlerFunctio... Remove this comment to see the full error message
                loading={false}
                history={history}
                params={{
                    id: '4ea88eef-18c7-47d7-90ab-cd160909268f',
                    slug: 'you-are-my-only-hope',
                    page: 0,
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ThemeProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Div100Vh>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <AppLogo />
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Act
                        data={data}
                        actions={() => (
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ThemeProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Div100Vh>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <AppLogo />
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ThemeProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Div100Vh>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <AppLogo />
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <ThankStep data={data} />
                </Div100Vh>
            </ThemeProvider>
        );
    });
