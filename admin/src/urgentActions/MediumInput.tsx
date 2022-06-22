import Box from '@mui/material/Box';
import { ImageInput, Labeled, TextInput } from 'react-admin';
import { ImagePreview } from './ImagePreview';

type MediumInputProps = {
    source: string;
    label?: string;
};

// export const validateMedium = (value: any, allValues: any) => {
//     console.log(value);
//     console.log(allValues);
//     const title = value;
//     const src = allValues;

//     if ((title && src) || (!title && !src)) {
//         return undefined;
//     }
//     return 'You need to specify both an image and an alternate text for medium or none of them';
// };

export const MediumInput = ({ source, label }: MediumInputProps) => {
    return (
        <Labeled label={label || 'Medium'}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ImageInput
                    source={`${source}.src`}
                    placeholder={<p>Drop a picture to upload, or click to select it</p>}
                    accept="image/*"
                    label={false}
                    helperText={false}
                    // validate={validateMedium}
                    sx={{
                        backgroundColor: '#fff',
                        marginBottom: '1rem',
                        '& .previews': {
                            textAlign: 'center',
                            '& > div': {
                                float: 'none',
                            },
                        },
                    }}
                >
                    <ImagePreview source={source} />
                </ImageInput>
                <TextInput
                    fullWidth
                    source={`${source}.title`}
                    label="Alternate text"
                    // validate={validateMedium}
                />
            </Box>
        </Labeled>
    );
};
