import { RichTextInput } from 'ra-input-rich-text';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const SettingsCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="type" validate={required()} helperText="The type should be unique" />
            <RichTextInput source="content" validate={required()} fullWidth />
        </SimpleForm>
    </Create>
);
