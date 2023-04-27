import { TextInput } from 'react-admin';

type ParagraphTemplateInputProps = {
    source?: string;
    mailToLength: number;
};

export const ParagraphTemplateInput = ({
    source,
    mailToLength,
}: ParagraphTemplateInputProps) => {
    return (
        <TextInput
            source={`${source}.value`}
            label={false}
            multiline
            fullWidth
            helperText={`${mailToLength}/2000 We recommend not to exceed for mailTo function.`}
        />
    );
};
