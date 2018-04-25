import React from 'react';
import {
    SimpleForm,
    TextInput,
    LongTextInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    DateField,
    required,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import get from 'lodash.get';

import { positionChoices, colorChoices } from './choices';

const Color = ({ record }) =>
    <div style={{ background: `#${record.name}`, width: '100%', height: '2rem' }} />;

const validateMedium = (value, record, _, key) => {
    const mediumKey = key.split('.').slice(0, -1).join('.');
    const titleKey = `${mediumKey}.title`;
    const srcKey = `${mediumKey}.src`;
    const title = get(record, titleKey);
    const src = get(record, srcKey);
    if ((title && src) || (!title && !src)) {
        return undefined;
    }

    return 'You need to specify both src and tilte for medium or none of them';
};

export default ({ edit }) => (
    <SimpleForm>
        <LongTextInput source="title" label="title" validate={required()} />
        <ArrayInput source="story" >
            <SimpleFormIterator>
                <RichTextInput
                    source="content"
                    validate={required()}
                />
                <label>medium</label>
                <TextInput  validate={validateMedium} source="medium.title" label="title" />
                <TextInput  validate={validateMedium} source="medium.src" label="src" />
                <label>theme</label>
                <SelectInput
                    validate={required()}
                    source="displayOptions.position"
                    label="position"
                    choices={positionChoices}
                />
                <SelectInput
                    validate={required()}
                    source="displayOptions.backgroundColor"
                    label="background"
                    choices={colorChoices}
                    optionText={<Color />}
                />
            </SimpleFormIterator>
        </ArrayInput>
        {
            edit && (<span>
                <DateField source="creation_date" />
                <DateField source="last_edition_date" />
            </span>)
        }
    </SimpleForm>
);
