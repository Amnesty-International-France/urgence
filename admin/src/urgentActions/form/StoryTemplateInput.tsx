import Box from '@mui/material/Box';
import {
    RichTextInput,
    RichTextInputToolbar,
    LevelSelect,
    FormatButtons,
    LinkButtons,
} from 'ra-input-rich-text';
import { FormDataConsumer, required, useSimpleFormIteratorItem } from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { MediumInput } from './MediumInput';

import { StoryCover, StoryStep, StorySlide } from 'amnesty-components';

import { FormData } from './index';

type StoryTemplateInputProps = {
    source?: string;
};

const defaultFormData = {
    content: null,
    medium: null,
};

const StoryCoverInput = ({ source }: StoryTemplateInputProps) => (
    <>
        <RichTextInput
            source={`${source}.content`}
            label="Text"
            validate={required()}
            toolbar={
                <RichTextInputToolbar>
                    <LevelSelect />
                    <FormatButtons />
                    <LinkButtons />
                </RichTextInputToolbar>
            }
        />
        <MediumInput source={`${source}.medium`} label="Cover Mobile" croppable />
        <MediumInput source={`${source}.mediumDesktop`} label="Cover Desktop" croppable />
    </>
);

const StoryStepInput = ({ source }: StoryTemplateInputProps) => (
    <>
        <RichTextInput
            source={`${source}.content`}
            label="Text"
            validate={required()}
            toolbar={
                <RichTextInputToolbar>
                    <LevelSelect />
                    <FormatButtons />
                    <LinkButtons />
                </RichTextInputToolbar>
            }
        />
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
                        <Card size="mobile">
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
                                            <StoryStep {...props} />
                                        )
                                    }
                                </StorySlide>
                            </FrontPreview>
                            {index === 0 && (
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
                                                <StoryStep {...props} />
                                            )
                                        }
                                    </StorySlide>
                                </FrontPreview>
                            )}
                        </Box>
                    </>
                )}
            </FormDataConsumer>
        </Box>
    );
};
