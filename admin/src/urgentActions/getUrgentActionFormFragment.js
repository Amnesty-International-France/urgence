import React from 'react';
import {
    ArrayInput,
    FormTab,
    LongTextInput,
    required,
    SimpleFormIterator,
    TabbedForm,
} from 'react-admin';

import RecipientInput from '../form/RecipientInput';
import RichTextInput from '../form/RichTextInput';

import ParagraphTemplateInput from './ParagraphTemplateInput';
import MediumInput from './MediumInput';
import DisplayOptionsInput from './DisplayOptionsInput';
import ThanksTab from './ThanksTab';

export default ({ edit }) => (
    <TabbedForm>
        <FormTab label="General">
            <LongTextInput source="title" validate={required()} />
        </FormTab>
        <FormTab label="Story">
            <ArrayInput source="story">
                <SimpleFormIterator>
                    <RichTextInput label="content" source="content" isRequired />
                    <MediumInput source="medium" />
                    <DisplayOptionsInput source="displayOptions" />
                </SimpleFormIterator>
            </ArrayInput>
        </FormTab>
        <FormTab label="Message">
            <RecipientInput label="Recipient" />
            <RichTextInput label="Call to Action" source="call_to_action" isRequired />
            <RichTextInput label="Object indication" source="object_indication" isRequired />
            <ArrayInput label="Paragraph Templates" source="message_template">
                <SimpleFormIterator>
                    <ParagraphTemplateInput source="" />
                </SimpleFormIterator>
            </ArrayInput>
        </FormTab>
        <FormTab label="Thanks Screen">
            <ThanksTab />
        </FormTab>
    </TabbedForm>
);
