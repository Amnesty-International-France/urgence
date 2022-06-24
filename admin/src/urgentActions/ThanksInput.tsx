import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { FormDataConsumer, required, TextInput } from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { getScreenIndex, THANKS } from './screenIndex';
import { FormData } from './UrgentActionsForm';

type ThanksInputProps = {
    source: string;
};

export const ThanksInput = ({ source }: ThanksInputProps) => {
    const defaultTitle = 'Bienvenue !';
    const defaultText = 'Nous comptons sur vous pour la prochaine action urgente.';

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
            }}
        >
            <FormDataConsumer>
                {({ formData }: { formData: FormData }) => {
                    const storySteps = formData.story ? formData.story.length : 0;
                    const interpelationMode = formData.call_to_action?.interpelation_mode;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '1em',
                                    marginRight: '8px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    color: '#fff',
                                    backgroundColor: 'primary.main',
                                    fontSize: '1.25rem',
                                }}
                            >
                                {getScreenIndex(THANKS, storySteps, interpelationMode)}
                            </Box>
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
                            <FrontPreview previewDevice="mobile">
                                TODO : Front Preview Mobile
                            </FrontPreview>
                        </Box>
                    );
                }}
            </FormDataConsumer>
        </Box>
    );
};
