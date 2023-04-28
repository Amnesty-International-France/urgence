import { TextInput } from 'react-admin';

type ParagraphTemplateInputProps = {
    source?: string;
    mailtoLength: number;
};

export const ParagraphTemplateInput = ({
    source,
    mailtoLength,
}: ParagraphTemplateInputProps) => {
    return (
        <TextInput
            source={`${source}.value`}
            label={false}
            multiline
            fullWidth
            helperText={`${mailtoLength}/2000 We recommend not to exceed for mailTo function.`}
        />
    );
};
