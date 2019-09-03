import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const toolbar = [[{ size: ['small', 'normal', 'large'] }, 'bold', 'italic', 'underline', 'link']];

export default props => (
    <Create title="Create New Setting" {...props}>
        <SimpleForm>
            <TextInput source="type" label="Type" validate={required()} />
            <RichTextInput
                source="content"
                label="Content *"
                toolbar={toolbar}
                validate={required()}
            />
        </SimpleForm>
    </Create>
);
