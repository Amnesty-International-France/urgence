import React from 'react';
import { Create, SimpleForm, SelectInput, required } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import types from './types';

const toolbar = [[{ size: ['small', 'normal', 'large'] }, 'bold', 'italic', 'underline', 'link']];

export default props => (
    <Create title="Create New Setting" {...props}>
        <SimpleForm>
            <SelectInput source="type" label="Type" choices={types} validate={required()} />
            <RichTextInput
                source="content"
                label="Content *"
                toolbar={toolbar}
                validate={required()}
            />
        </SimpleForm>
    </Create>
);
