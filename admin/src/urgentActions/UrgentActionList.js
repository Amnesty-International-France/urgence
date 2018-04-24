import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    Responsive,
    TextField,
    DateField,
} from 'react-admin';

export default (props) => (
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
                    <DateField source="creation_date" />
                    <DateField source="last_edition_date" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);
