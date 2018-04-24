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
                    source="theme.position"
                    label="position"
                    choices={positionChoices}
                    />
                <SelectInput
                    source="theme.backgroundColor"
                    label="background"
                    choices={colorChoices}
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
