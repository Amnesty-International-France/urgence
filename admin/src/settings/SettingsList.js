import React from 'react';
import { Datagrid, List, TextField, DateField } from 'react-admin';

const dateFormat = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const sort = { field: 'updated_on', order: 'DESC' };

export default props => (
    <List {...props} title="Settings" sort={sort} perPage={25}>
        <Datagrid>
            <TextField source="id" />
            <DateField source="created_on" label="Created On" options={dateFormat} showTime />
            <DateField source="updated_on" label="Updated On" options={dateFormat} showTime />
            <TextField source="content" label="Contenu" />
        </Datagrid>
    </List>
);
