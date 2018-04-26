import React from 'react';
import {
    FormTab,
    TabbedForm,
    ArrayInput,
    SimpleFormIterator,
    LongTextInput,
    required,
} from 'react-admin';

import RichTextInput from '../form/RichTextInput';

import ParagraphTemplateInput from './ParagraphTemplateInput';
import MediumInput from './MediumInput';
import DisplayOptionsInput from './DisplayOptionsInput';

export const validateMail = text =>
    text && text
        .split(',')
        .find(
            t => !t.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ) ? 'Must contain only mail separated by ","' : null;

export default ({ edit }) => (
    <TabbedForm>
        <FormTab label="General">
            <LongTextInput source="title" validate={required()} />
        </FormTab>
        <FormTab label="Story">
            <ArrayInput source="story">
                <SimpleFormIterator>
                    <RichTextInput
                        source="content"
                        isRequired
                    />
                    <MediumInput source="medium" />
                    <DisplayOptionsInput source="displayOptions" />
                </SimpleFormIterator>
            </ArrayInput>
        </FormTab>
        <FormTab label="Message">
            <LongTextInput label="Mail" source="recipient.mail" validate={[validateMail, required()]} />
            <LongTextInput label="Copies to" source="recipient.copies_to" validate={validateMail} />
            <LongTextInput label="CCI" source="recipient.cci" validate={validateMail} />
            <RichTextInput label="Call to Action" source="call_to_action" isRequired />
            <RichTextInput label="Object indication" source="object_indication" isRequired />
            <ArrayInput label="Paragraph Templates" source="message_template">
                <SimpleFormIterator>
                    <ParagraphTemplateInput source="" />
                </SimpleFormIterator>
            </ArrayInput>
        </FormTab>
    </TabbedForm>
);
