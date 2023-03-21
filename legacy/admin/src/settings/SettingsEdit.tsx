import { RichTextInput } from 'ra-input-rich-text';
import { DateField, Edit, Labeled, required, SimpleForm, TextField } from 'react-admin';
import dateFormat from '../dateFormat';

export const SettingsEdit = () => (
    <Edit>
        <SimpleForm
            sx={{
                '& .RaLabeled-label': {
                    marginTop: '0.75rem',
                },
            }}
        >
            <Labeled>
                <TextField source="id" />
            </Labeled>
            <Labeled>
                <DateField source="created_on" options={dateFormat} showTime />
            </Labeled>
            <Labeled>
                <DateField source="updated_on" options={dateFormat} showTime />
            </Labeled>
            <Labeled>
                <TextField source="type" />
            </Labeled>
            <RichTextInput source="content" validate={required()} />
        </SimpleForm>
    </Edit>
);
