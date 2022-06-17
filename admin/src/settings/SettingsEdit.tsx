import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import { DefaultEditorOptions, RichTextInput } from 'ra-input-rich-text';
import { DateField, Edit, Labeled, required, SimpleForm, TextField } from 'react-admin';

export const SettingsEdit = () => (
    <Edit>
        <SimpleForm>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <TextField source="id" />
            </Labeled>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <DateField source="created_on" showTime />
            </Labeled>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <DateField source="updated_on" showTime />
            </Labeled>
            <Labeled sx={{ marginBottom: '1.5em' }}>
                <TextField source="type" />
            </Labeled>
            <RichTextInput source="content" validate={required()} editorOptions={MyEditorOptions} />
        </SimpleForm>
    </Edit>
);

export const MyEditorOptions = {
    ...DefaultEditorOptions,
    extensions: [...DefaultEditorOptions.extensions, Color, TextStyle, Highlight],
};
