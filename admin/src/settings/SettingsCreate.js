import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

import SettingsContentInput from './SettingsContentInput';

export default props => (
    <Create title="Create New Setting" {...props}>
        <SimpleForm>
            <TextInput source="type" label="Type" validate={required()} />
            <SettingsContentInput source="content" label="Content *" validate={required()} />
        </SimpleForm>
    </Create>
);
