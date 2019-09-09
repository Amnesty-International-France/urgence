import React from 'react';
import { Edit, SimpleForm, TextField, DateField, required } from 'react-admin';

import dateFormat from '../dateFormat';
import SettingsContentInput from './SettingsContentInput';

export default props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id" />
            <DateField source="created_on" label="Created On" options={dateFormat} showTime />
            <DateField source="updated_on" label="Updated On" options={dateFormat} showTime />
            <TextField source="type" label="Type" />
            <SettingsContentInput source="content" label="Content *" validate={required()} />
        </SimpleForm>
    </Edit>
);
