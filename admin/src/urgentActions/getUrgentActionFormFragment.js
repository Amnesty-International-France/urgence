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
import StoryTemplateInput from './StoryTemplateInput';
import ThanksTab from './ThanksTab';

import StoryStepFormIterator from './StoryStepFormIterator';


export default () => (
    <TabbedForm>
        <FormTab label="General">
            <LongTextInput source="title" validate={required()} />
        </FormTab>
        <FormTab label="Story">
            <ArrayInput source="story" label="">
                <StoryStepFormIterator>
                    <StoryTemplateInput source=""/>
                </StoryStepFormIterator>
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
