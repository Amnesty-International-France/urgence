import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { required, TextInput } from 'react-admin';
import { Card } from './Card';

type ThanksInputProps = {
    source: string;
};

export const Part9Thanks = ({ source }: ThanksInputProps) => {
    const defaultTitle = 'Bienvenue !';
    const defaultText = 'Nous comptons sur vous pour la prochaine action urgente.';

    return (
        <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }}>
            <Card>
                <TextInput
                    source={`${source}.title`}
                    label="Title"
                    fullWidth
                    defaultValue={defaultTitle}
                    validate={[required()]}
                />
                <RichTextInput
                    source={`${source}.text`}
                    label="Text"
                    defaultValue={defaultText}
                    validate={[required()]}
                />
            </Card>
        </Box>
    );
};

export default Part9Thanks;
