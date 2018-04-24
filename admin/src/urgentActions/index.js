import React from 'react';
import {
    Delete,
    Create,
    Datagrid,
    EditButton,
    List,
    Responsive,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';
import withStyles from 'material-ui/styles/withStyles';
import UrgentActionEdit from './UrgentActionEdit';

import UrgentActionTitle from './UrgentActionTitle';

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

export default {
    name: 'Urgent Actions',
    list: UrgentActionList,
    edit: UrgentActionEdit,
    create: UrgentActionCreate,
    remove: Delete,
};
