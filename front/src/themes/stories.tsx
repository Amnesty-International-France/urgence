import React from 'react';
import { storiesOf } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

// @ts-expect-error TS(6142): Module './RichText' was resolved to '/home/guillau... Remove this comment to see the full error message
import RichText from './RichText';
// @ts-expect-error TS(6142): Module './Image' was resolved to '/home/guillaume/... Remove this comment to see the full error message
import Image from './Image';
// @ts-expect-error TS(6142): Module './Button' was resolved to '/home/guillaume... Remove this comment to see the full error message
import { Button } from './Button';
// @ts-expect-error TS(6142): Module './LoadingScreen' was resolved to '/home/gu... Remove this comment to see the full error message
import LoadingScreen from './LoadingScreen';
// @ts-expect-error TS(6142): Module './Stepper' was resolved to '/home/guillaum... Remove this comment to see the full error message
import Stepper from './Stepper';
// @ts-expect-error TS(6142): Module './Input' was resolved to '/home/guillaume/... Remove this comment to see the full error message
import Input from './Input';
// @ts-expect-error TS(6142): Module './TextArea' was resolved to '/home/guillau... Remove this comment to see the full error message
import TextArea from './TextArea';
// @ts-expect-error TS(6142): Module './CopyToClipboardButton' was resolved to '... Remove this comment to see the full error message
import CopyToClipboardButton from './CopyToClipboardButton';

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
storiesOf('Screens', module).add('Loading Screen', () => <LoadingScreen />);

storiesOf('User Interface', module)
    .add('Textarea', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>Empty textarea:</p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextArea />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>Pre-filled textarea:</p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextArea>
                {`Le 26 mars, une cour d'appel militaire a confirmé la condamnation à mort des deux
                hommes, à l'issue d'un procès manifestement inique fondé sur des « aveux » extorqués
                sous la torture durant leur disparition forcée.`}
            </TextArea>
        </div>
    ))
    .add('Input', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>Empty input:</p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>Pre-filled textarea:</p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input value="Hello world!" />
        </div>
    ))
    .add('Image', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
            style={{
                maxWidth: 620,
            }}
        >
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Image
                src="/img/abdolfatah-soltani.jpg"
                title="Abdolfatah Soltani, avocat iranien spécialisé dans la défense des droits humains."
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>This image is responsive: resize your browser to see it in action!</p>
        </div>
    ))
    .add('Rich Text', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RichText
            html={`
                <p>
                    This is a paragraph with a <a href="#">link</a>, some <strong>bold text</strong>, and even
                    some <span style="color: red; font-size: 24px;">colored big text</span>!
                </p>
                <marquee>It can even bring some magnificent sliding text!</marquee>
            `}
        />
    ))
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    .add('Button', () => <Button label="click me" onClick={() => alert('clicked')} />)
    .add('CopyToClipboardButton', () => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div
            style={{
                margin: 50,
            }}
        >
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <CopyToClipboardButton textToCopy="Successfully copied!">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <FontAwesomeIcon icon={faLink} size="xs" />
            </CopyToClipboardButton>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <input type="text" placeholder="Paste the copied text here" />
        </div>
    ))
    .add('Stepper', () => {
        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p>Stepper 2/5</p>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Stepper data={{ UrgentAction: { story: ['', ''] } }} step="story" page="1" />
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p>Stepper 5/5</p>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Stepper data={{ UrgentAction: { story: ['', ''] } }} step="share" page="1" />
            </div>
        );
    });
