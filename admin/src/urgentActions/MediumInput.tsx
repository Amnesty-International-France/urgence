import Box from '@mui/material/Box';
import { ImageInput, Labeled, TextInput } from 'react-admin';

type MediumInputProps = {
    source: string;
    label?: string;
};

export const MediumInput = ({ source, label }: MediumInputProps) => {
    return (
        <Labeled label={label || 'Medium'}>
            <Box>
                <ImageInput
                    source={`${source}.src`}
                    placeholder={<p>Drop a picture to upload, or click to select it</p>}
                    accept="image/*"
                    label={false}
                />
                <TextInput source={`${source}.src`} label="Alt" fullWidth />
                <TextInput fullWidth source={`${source}.title`} label="Alternate text" />
            </Box>
        </Labeled>
    );
};
