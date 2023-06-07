import { TextInput } from 'react-admin';

type ParagraphTemplateInputProps = {
    source?: string;
};

export const ParagraphTemplateInput = ({ source }: ParagraphTemplateInputProps) => {
    return <TextInput source={`${source}.value`} label="Corps du mail" multiline fullWidth />;
};
