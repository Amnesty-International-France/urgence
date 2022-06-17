import { RichTextInput } from 'ra-input-rich-text';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

// import SettingsContentInput from './SettingsContentInput';

export const SettingsCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="type" validate={required()} helperText="The type should be unique" />
            <RichTextInput source="content" validate={required()} />
        </SimpleForm>
    </Create>
);
