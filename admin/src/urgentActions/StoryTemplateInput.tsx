import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { RichTextInput } from 'ra-input-rich-text';
import { required, useSimpleFormIteratorItem } from 'react-admin';
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
    console.log(index);
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
                width: '100%',
            }}
        >
            <Card
                sx={{
                    margin: '1rem 1rem 2rem',
                    width: 450,
                    '& .RaLabeled-label': {
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                    },
                    '& .RaRichTextInputToolbar-root': {
                        flexWrap: 'wrap',
                        gap: '5px',
                    },
                }}
            >
                <CardContent>
                    {index === 0 ? (
                        <StoryCoverInput source={source} />
                    ) : (
                        <StoryStepInput source={source} />
                    )}
                </CardContent>
            </Card>
            <Box sx={{ flex: 1 }}>
                <FrontPreview previewDevice="mobile">TODO : Front Preview Mobile</FrontPreview>
                <FrontPreview previewDevice="desktop">TODO : Front Preview Desktop</FrontPreview>
            </Box>
        </Box>
    );
};
