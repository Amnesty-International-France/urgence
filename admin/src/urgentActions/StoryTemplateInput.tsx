import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { FormDataConsumer, required, useSimpleFormIteratorItem } from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { MediumInput } from './MediumInput';

//@ts-ignore
import StoryCover from 'front/src/urgentActions/story/StoryCover';
//@ts-ignore
import StorySlide from 'front/src/urgentActions/story/StorySlide';
//@ts-ignore

import { FormData } from './UrgentActionsForm';

type StoryTemplateInputProps = {
    source?: string;
};

const defaultFormData = {
    content: null,
    medium: null,
};

const StoryCoverInput = ({ source }: StoryTemplateInputProps) => (
    <>
        <RichTextInput source={`${source}.content`} label="Text" validate={required()} />
        <MediumInput source={`${source}.medium`} label="Cover Mobile" croppable />
        <MediumInput source={`${source}.mediumDesktop`} label="Cover Desktop" croppable />
    </>
);

const StoryStepInput = ({ source }: StoryTemplateInputProps) => (
    <>
        <RichTextInput source={`${source}.content`} label="Text" validate={required()} />
    </>
);

export const StoryTemplateInput = ({ source }: StoryTemplateInputProps) => {
    const { index } = useSimpleFormIteratorItem();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
                width: '100%',
            }}
        >
            <FormDataConsumer>
                {({ formData }: { formData: FormData }) => (
                    <>
                        <Card>
                            {index === 0 ? (
                                <StoryCoverInput source={source} />
                            ) : (
                                <StoryStepInput source={source} />
                            )}
                        </Card>
                        <Box sx={{ flex: 1 }}>
                            <FrontPreview previewDevice="mobile">
                                <StorySlide
                                    className=""
                                    step={
                                        formData.story
                                            ? {
                                                  ...defaultFormData,
                                                  ...formData.story[index],
                                              }
                                            : {
                                                  ...defaultFormData,
                                              }
                                    }
                                >
                                    {(props: any) =>
                                        index === 0 ? (
                                            <StoryCover {...props} className="cover" isMobile />
                                        ) : (
                                            "Erreur à l'import de StoryStep"
                                            // <StoryStep {...props} />
                                        )
                                    }
                                </StorySlide>
                            </FrontPreview>
                            <FrontPreview previewDevice="desktop">
                                <StorySlide
                                    className=""
                                    step={
                                        formData.story
                                            ? {
                                                  ...defaultFormData,
                                                  ...formData.story[index],
                                              }
                                            : {
                                                  ...defaultFormData,
                                              }
                                    }
                                >
                                    {(props: any) =>
                                        index === 0 ? (
                                            <StoryCover {...props} className="cover" />
                                        ) : (
                                            "Erreur à l'import de StoryStep"
                                            // <StoryStep {...props} />
                                        )
                                    }
                                </StorySlide>
                            </FrontPreview>
                        </Box>
                    </>
                )}
            </FormDataConsumer>
        </Box>
    );
};
