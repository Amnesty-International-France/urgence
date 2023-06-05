import React, { useState } from 'react';
import {
    BooleanInput,
    required,
    TextInput,
    useRecordContext,
} from 'react-admin';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { orange } from '@mui/material/colors';
import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';

const generateSlug = (title = '') =>
    slugify(title, {
        replacement: '-',
        remove: /[*+~.()'"!:@#,]/g,
        lower: true,
    });

const Part1Camgaign = () => {
    const { setValue } = useFormContext();
    const record = useRecordContext();
    const [emptyCode, setEmptyCode] = useState(!record?.campaign_code);

    const handleCampaignCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmptyCode(event.target.value === '');
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        const slug = generateSlug(title);
        setValue('slug', slug);
    };

    return (
        <>
            <Grid container spacing={3} alignItems="center" style={{ width: '100%' }}>
                <Grid item xs={12} sm={8}>
                    <TextInput
                        source="campaign_code"
                        label="Code Campagne"
                        fullWidth
                        onChange={handleCampaignCodeChange}
                        helperText={
                            emptyCode ? (
                                <Box component="span" sx={{ color: orange[600] }}>
                                    Activists actions won't be sent down to SalesForce while this
                                    field remains empty.
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
        </>
    );
};

export default Part1Camgaign;
