import { RichTextInput } from 'ra-input-rich-text';
import { DateField, Edit, Labeled, required, SimpleForm, TextField } from 'react-admin';
import dateFormat from '../dateFormat';

export const SettingsEdit = () => (
    <Edit>
        <SimpleForm>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <TextField source="id" />
            </Labeled>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <DateField source="created_on" options={dateFormat} showTime />
            </Labeled>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <DateField source="updated_on" options={dateFormat} showTime />
            </Labeled>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <TextField source="type" />
            </Labeled>
            <RichTextInput source="content" validate={required()} />
        </SimpleForm>
    </Edit>
);
