import React from 'react';
import {
    SimpleForm,
    TextInput,
    LongTextInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    DateField
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import { positionChoices, colorChoices } from './choices';

const Color = ({ record }) =>
    <div style={{ background: `#${record.name}`, width: '100%', height: '2rem' }} />;

export default ({ edit }) => (
    <SimpleForm>
        <LongTextInput source="title" label="title" />
        <ArrayInput source="story">
            <SimpleFormIterator>
                <RichTextInput source="content" />
                <label>medium</label>
                <TextInput source="medium.title" label="title" />
                <TextInput source="medium.src" label="src" />
                <label>theme</label>
                <SelectInput
                    source="displayOptions.position"
                    label="position"
                    choices={positionChoices}
                />
                <SelectInput
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
