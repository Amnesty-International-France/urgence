import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { FormDataConsumer, required, useSimpleFormIteratorItem } from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { MediumInput } from './MediumInput';

import { StoryCover, StoryStep, StorySlide } from 'amnesty-components';

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
            <Card>
                {index === 0 ? (
                    <StoryCoverInput source={source} />
                ) : (
                    <StoryStepInput source={source} />
                )}
            </Card>
        </Box>
    );
};
