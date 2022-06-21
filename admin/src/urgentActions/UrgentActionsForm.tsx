import Box from '@mui/material/Box';
import { grey, orange, purple } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { BooleanInput, required, TextInput, useRecordContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';

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
                '& div.MuiBox-root': {
                    padding: '0 1em 1em 1em',
                },
            }}
        >
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
                <TextInput source="social_metadata.description" fullWidth label="Description" />
            </Box>
        </Box>
    );
};
