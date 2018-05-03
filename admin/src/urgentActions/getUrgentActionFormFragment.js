import React from 'react';
import {
    FormTab,
    TabbedForm,
    TextInput,
    LongTextInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    required,
    ImageInput,
    ImageField
} from 'react-admin';

import RichTextInput from '../form/RichTextInput';

import get from 'lodash.get';

import ParagraphTemplateInput from './ParagraphTemplateInput';
import { positionChoices, colorChoices } from './choices';

const Color = ({ record }) =>
    <div style={{ background: record.name, width: '100%', height: '2rem' }} />;

export const validateMedium = (value, record, _, key) => {
    const mediumKey = key.split('.').slice(0, -1).join('.');
    const titleKey = `${mediumKey}.title`;
    const srcKey = `${mediumKey}.src`;
    const title = get(record, titleKey);
    const src = get(record, srcKey);
    if ((title && src) || (!title && !src)) {
        return undefined;
    }

    return 'You need to specify both src and title for medium or none of them';
};

export default ({ edit, record, ...rest }) => (
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
                    <label>medium</label>
                    <TextInput  validate={validateMedium} source="medium.title" label="title" />
                    <ImageInput validate={validateMedium} source="medium.src" label="src">
                        <ImageField source="medium.src" title="Preview" />
                    </ImageInput>
                    <TextInput disabled source="medium.src" title="Preview" />
                    <label>theme</label>
                    <SelectInput
                        validate={required()}
                        source="displayOptions.mediumPosition"
                        label="Medium position"
                        choices={positionChoices}
                    />
                    <SelectInput
                        validate={required()}
                        source="displayOptions.backgroundColor"
                        label="Background color"
                        choices={colorChoices}
                        optionText={<Color />}
                    />
                    <SelectInput
                        validate={required()}
                        source="displayOptions.color"
                        label="Text color"
                        choices={colorChoices}
                        optionText={<Color />}
                    />
                </SimpleFormIterator>
            </ArrayInput>
        </FormTab>
        <FormTab label="Message">
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
