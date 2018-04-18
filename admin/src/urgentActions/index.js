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
} from 'react-admin';
import withStyles from 'material-ui/styles/withStyles';

const listStyles = {
    total: { fontWeight: 'bold' },
};

export const UrgentActionList = withStyles(listStyles)(({ classes, ...props }) => (
    <List
        {...props}
        title={'Action Urgentes'}
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
        Action Urgente: {record.title}
    </span>
);

const editStyles = {
    clear: { clear: 'both' },
};

export const UrgentActionEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<UrgentActionTitle />} {...props}>
        <SimpleForm>
            <TextInput source="title" />
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
