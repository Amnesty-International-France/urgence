import React from 'react';
import { storiesOf } from '@storybook/react';

import RichText from './RichText';
import Image from './Image';
import { Button } from './Button';
import LoadingScreen from './LoadingScreen';
import Steps from './Steps';
import Input from './Input';
import TextArea from './TextArea';
import CopyToClipboardButton from './CopyToClipboardButton';

storiesOf('Screens', module).add('Loading Screen', () => <LoadingScreen />);

storiesOf('User Interface', module)
    .add('Textarea', () => (
        <div>
            <p>Empty textarea:</p>
            <TextArea />
            <p>Pre-filled textarea:</p>
            <TextArea>
                Le 26 mars, une cour d'appel militaire a confirmé la condamnation à mort des deux
                hommes, à l'issue d'un procès manifestement inique fondé sur des « aveux » extorqués
                sous la torture durant leur disparition forcée.
            </TextArea>
        </div>
    ))
    .add('Input', () => (
        <div>
            <p>Empty input:</p>
            <Input />
            <p>Pre-filled textarea:</p>
            <Input value="Hello world!" />
        </div>
    ))
    .add('Image', () => (
        <div
            style={{
                maxWidth: 620,
            }}
        >
            <Image
                src="/img/abdolfatah-soltani.jpg"
                title="Abdolfatah Soltani, avocat iranien spécialisé dans la défense des droits humains."
            />
            <p>This image is responsive: resize your browser to see it in action!</p>
        </div>
    ))
    .add('Rich Text', () => (
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
    .add('Button', () => <Button label="click me" onClick={() => alert('clicked')} />)
    .add('CopyToClipboardButton', () => (
        <CopyToClipboardButton textToCopy="Copy me">
            <span>Copy me</span>
        </CopyToClipboardButton>
    ))
    .add('Steps', () => {
        return (
            <div>
                <p>Step 3/5</p>
                <Steps current={3} total={5} />
                <p>Step 5/5</p>
                <Steps current={5} total={5} />
            </div>
        );
    });
