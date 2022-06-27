import Box from '@mui/material/Box';

import { RichTextInput } from 'ra-input-rich-text';
import { required, useSimpleFormIteratorItem } from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { MediumInput } from './MediumInput';

type StoryTemplateInputProps = {
    source?: string;
};

const StoryCoverInput = ({ source }: StoryTemplateInputProps) => (
    <>
        <RichTextInput source={`${source}.content`} label="Text" validate={required()} />
        <MediumInput source={`${source}.medium`} label="Cover Mobile" />
        <MediumInput source={`${source}.mediumDesktop`} label="Cover Desktop" />
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
            <Box sx={{ flex: 1 }}>
                <FrontPreview previewDevice="mobile">TODO : Front Preview Mobile</FrontPreview>
                <FrontPreview previewDevice="desktop">TODO : Front Preview Desktop</FrontPreview>
            </Box>
        </Box>
    );
};
