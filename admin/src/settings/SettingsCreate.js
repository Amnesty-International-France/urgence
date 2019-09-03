import React from 'react';
import { Create, SimpleForm, SelectInput, required } from 'react-admin';
import RichTextInput from '../form/RichTextInput';

import types from './types';

export default props => (
    <Create title="Create New Setting" {...props}>
        <SimpleForm>
            <SelectInput source="type" choices={types} validate={required()} />
            <RichTextInput source="content" validate={required()} />
        </SimpleForm>
    </Create>
);
