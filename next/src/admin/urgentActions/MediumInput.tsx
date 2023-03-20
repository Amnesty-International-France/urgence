import Box from '@mui/material/Box';
import { FormDataConsumer, ImageInput, Labeled, required, TextInput } from 'react-admin';
import { ImagePreview } from './ImagePreview';
import { FormData, Medium } from './UrgentActionsForm';

type MediumInputProps = {
    source: string;
    label?: string;
    croppable?: boolean;
};

export const MediumInput = ({ source, label, croppable }: MediumInputProps) => {
    return (
        <Labeled label={label || 'Medium'}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '25rem',
                }}
            >
                <ImageInput
                    source={`${source}.src`}
                    placeholder={<p>Drop a picture to upload, or click to select it</p>}
                    accept="image/*"
                    label={false}
                    helperText={false}
                    sx={{
                        position: 'relative',
                        '& .RaFileInput-dropZone': {
                            height: '15rem',
                            background: '#fafafa',
                            color: 'rgba(0,0,0,0.3)',
                        },
                        '& .previews': {
                            position: 'absolute',
                            top: 74,
                            textAlign: 'center',
                            left: 15,
                            right: 15,
                            '& > div': {
                                float: 'none',
                            },
                        },
                        '& .MuiFormHelperText-root': {
                            marginLeft: '14px',
                            marginRight: '14px',
                            color: 'error.main',
                        },
                    }}
                >
                    <ImagePreview source="src" parentField={source} croppable={croppable} />
                </ImageInput>
                <FormDataConsumer>
                    {({ formData }: { formData: FormData }) => {
                        const keys = source.split('.');
                        const value = keys.reduce((obj, key) => {    
                            // @ts-ignore                        
                            if (obj && obj[key]) return obj[key];
                            return null;
                        }, formData) as unknown as Medium;
                        return (
                            value?.src && (
                                <TextInput
                                    fullWidth
                                    source={`${source}.title`}
                                    label="Alternate text"
                                    validate={required(
                                        'You need to specify an alternate text for the image or remove it',
                                    )}
                                />
                            )
                        );
                    }}
                </FormDataConsumer>
            </Box>
        </Labeled>
    );
};
