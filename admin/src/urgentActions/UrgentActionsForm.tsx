import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import { blue, grey, orange, purple } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import {
    ArrayInput,
    BooleanInput,
    required,
    SaveButton,
    SimpleFormIterator,
    TextInput,
    useRecordContext,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import { theme } from '../theme';
import { CustomAddButton } from './CustomAddButton';
import { MediumInput } from './MediumInput';
import { StoryTemplateInput } from './StoryTemplateInput';

const generateSlug = (title = '') =>
    slugify(title, {
        replacement: '-',
        remove: /[*+~.()'"!:@#,]/g,
        lower: true,
    });

export const UrgentActionsForm = () => {
    const { setValue } = useFormContext();
    const record = useRecordContext();
    const [emptyCode, setEmptyCode] = useState(!record.campaign_code);

    const handleCampaignCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmptyCode(event.target.value === '');
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        const slug = generateSlug(title);
        setValue('slug', slug);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                '& h2': {
                    margin: 0,
                    paddingTop: '1rem',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    color: grey[600],
                },
                '& > div.MuiBox-root': {
                    padding: '0 1em 1em 1em',
                },
            }}
        >
            <SaveButton
                sx={{
                    position: 'absolute',
                    right: '100px',
                    top: '56px',
                    backgroudColor: 'transparent',
                    boxShadow: 'none',
                    color: 'primary.main',
                    padding: '4px 5px',
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                    },
                    '&:not(.Mui-disabled)': {
                        backgroundColor: 'transparent',
                    },
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        boxShadow: 'none',
                    },
                }}
            />
            <Box>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={8}>
                        <TextInput
                            source="campaign_code"
                            label="Code Campagne"
                            fullWidth
                            onChange={handleCampaignCodeChange}
                            helperText={
                                emptyCode ? (
                                    <Box component="span" sx={{ color: orange[600] }}>
                                        Activists actions won't be sent down to SalesForce while
                                        this field remains empty.
                                    </Box>
                                ) : (
                                    <span></span>
                                )
                            }
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <BooleanInput
                            source="is_default"
                            label="Afficher par défaut"
                            defaultValue={false}
                            helperText={false}
                        />
                    </Grid>
                </Grid>
                <TextInput
                    label="Titre"
                    source="title"
                    validate={required()}
                    fullWidth
                    onChange={handleTitleChange}
                />
                <TextInput source="slug" fullWidth disabled />
            </Box>
            <Box sx={{ backgroundColor: purple[50] }}>
                <h2>Métadonnées Réseaux sociaux</h2>
                <TextInput source="social_metadata.title" fullWidth label="Title" />
                <TextInput source="social_metadata.description" fullWidth label="Description" />
                <MediumInput source="social_metadata.medium" label="Cover" />
            </Box>
            <Box sx={{ backgroundColor: blue[50] }}>
                <h2>Story</h2>
                <ArrayInput
                    source="story"
                    label={false}
                    sx={{
                        '& .RaSimpleFormIterator-indexContainer': {
                            padding: 0,
                        },
                        '& .RaSimpleFormIterator-index': {
                            borderRadius: '50%',
                            color: '#fff',
                            backgroundColor: 'primary.main',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.25rem',
                        },
                    }}
                >
                    <SimpleFormIterator disableReordering addButton={<CustomAddButton />}>
                        {/* <TextInput source="content" /> */}
                        <StoryTemplateInput />
                    </SimpleFormIterator>
                </ArrayInput>
            </Box>
        </Box>
    );
};
