import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    LongTextInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    DateField
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import withStyles from 'material-ui/styles/withStyles';

import UrgentActionTitle from './UrgentActionTitle';
import { positionChoices, colorChoices } from './choices';

const editStyles = {
    clear: { clear: 'both' },
};

export default withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<UrgentActionTitle />} {...props}>
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
            <DateField source="creation_date" />
            <DateField source="last_edition_date" />
        </SimpleForm>
    </Edit>
));
