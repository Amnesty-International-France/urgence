import React from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    Responsive,
    SimpleForm,
    TextField,
    TextInput,
    LongTextInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    DateField
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import withStyles from 'material-ui/styles/withStyles';

const listStyles = {
    total: { fontWeight: 'bold' },
};

export const UrgentActionList = withStyles(listStyles)(({ classes, ...props }) => (
    <List
        {...props}
        title={'Urgent Actions'}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={25}
    >
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="title" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
));

const UrgentActionTitle = ({ record }) => (
    <span>
        {record.title}
    </span>
);

const editStyles = {
    clear: { clear: 'both' },
};

const positionChoices = [{ id: 'top', name: 'Top' }, { id: 'bottom', name: 'Bottom' }];
const colorChoices = ['000000', 'FFFF00', 'FFFFFF', 'd2026d', 'df3725', 'ed8122'].map(color => ({
    id: color,
    name: <div style={{ background: `#${color}`, width: '100%', height: '2rem' }} />
}));

export const UrgentActionEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<UrgentActionTitle />} {...props}>
        <SimpleForm>
            <LongTextInput source="title" label="title" />
            <ArrayInput source="story">
                <SimpleFormIterator>
                    <RichTextInput source="content" />
                    <label>medium</label>
                    <TextInput source="medium.title" label="title" />
                    <TextInput source="medium.src" label="src" />
                    <label>theme</label>
                    <SelectInput
                        source="theme.position"
                        label="position"
                        choices={positionChoices}
                        />
                    <SelectInput
                        source="theme.backgroundColor"
                        label="background"
                        choices={colorChoices}
                    />
                </SimpleFormIterator>
            </ArrayInput>
            <DateField source="creation_date" />
            <DateField source="last_edition_date" />
        </SimpleForm>
    </Edit>
));

const createStyles = {
    width: { width: '5em' },
    widthFormGroup: { display: 'inline-block' },
    height: { width: '5em' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

export const UrgentActionCreate = withStyles(
    createStyles
)(({ classes, ...props }) => (
    <Create title={<UrgentActionTitle />} {...props}>
        <SimpleForm>
            <TextInput source="title" />
        </SimpleForm>
    </Create>
));
