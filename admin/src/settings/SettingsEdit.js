import React from 'react';
import { Edit, SimpleForm, TextField, DateField, TextInput, required } from 'react-admin';

import SettingsContentInput from './SettingsContentInput';

const dateFormat = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

export default props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <DateField source="created_on" label="Created On" options={dateFormat} showTime />
            <DateField source="updated_on" label="Updated On" options={dateFormat} showTime />
            <TextInput source="type" label="Type" validate={required()} />
            <TextInput source="type" label="Type" validate={required()} />
            <SettingsContentInput source="content" label="Content *" validate={required()} />
        </SimpleForm>
    </Edit>
);
