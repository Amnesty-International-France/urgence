import React, { useState } from 'react';
import {
    ArrayInput,
    BooleanInput,
    DateInput,
    Edit,
    required,
    SelectInput,
    SimpleFormIterator,
    TextField,
    TextInput,
    Labeled,
    useRecordContext,
} from 'react-admin';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { blue, green, grey, orange, purple, red, teal, yellow } from '@mui/material/colors';
import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';

import { LongForm } from './form/LongForm';
import { UrgentActionsTitle } from './UrgentActionsTitle';

const generateSlug = (title = '') =>
    slugify(title, {
        replacement: '-',
        remove: /[*+~.()'"!:@#,]/g,
        lower: true,
    });

const ActionEdit = () => {
    return (
        <Edit component="div" title={<UrgentActionsTitle />}>
            <ActionForm />
        </Edit>
    );
};

const FormPart1 = () => {
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

const ActionForm = () => {
    return (
        <LongForm>
            <LongForm.Section label="Action definition">
                <FormPart1 />
            </LongForm.Section>
            <LongForm.Section label="Occupations">
                <ArrayInput source="occupations" label="">
                    <SimpleFormIterator>
                        <TextInput source="name" validate={required()} />
                        <DateInput source="from" validate={required()} />
                        <DateInput source="to" />
                    </SimpleFormIterator>
                </ArrayInput>
            </LongForm.Section>
            <LongForm.Section label="Preferences">
                <BooleanInput source="dark_theme" />
                <BooleanInput source="accepts_emails_from_partners" />
            </LongForm.Section>
        </LongForm>
    );
};

export default ActionEdit;
