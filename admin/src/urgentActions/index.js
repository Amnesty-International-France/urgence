import React from 'react';
import {
    Delete,
    Datagrid,
    EditButton,
    List,
    Responsive,
    TextField,
} from 'react-admin';
import withStyles from 'material-ui/styles/withStyles';

import UrgentActionEdit from './UrgentActionEdit';
import UrgentActionCreate from './UrgentActionCreate';

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

export default {
    name: 'Urgent Actions',
    list: UrgentActionList,
    edit: UrgentActionEdit,
    create: UrgentActionCreate,
    remove: Delete,
};
