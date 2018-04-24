import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import RichText from './RichText';
import Image from './Image';

storiesOf('User Interface', module)
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
            <p>
                This image is responsive: resize your browser to see it in
                action!
            </p>
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
    ));
