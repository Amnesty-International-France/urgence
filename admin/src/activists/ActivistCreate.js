import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default props => (
    <Create title="Create New Activist" {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="firstname" label="First Name" />
            <TextInput source="lastname" label="Last Name" />
            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);
