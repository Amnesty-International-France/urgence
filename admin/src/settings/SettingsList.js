import React from 'react';
import { Datagrid, List, EditButton, TextField, DateField } from 'react-admin';

import dateFormat from '../dateFormat';

const sort = { field: 'id', order: 'DESC' };

export default props => (
    <List {...props} title="Settings" sort={sort} perPage={25}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="type" />
            <DateField source="created_on" label="Created On" options={dateFormat} showTime />
            <DateField source="updated_on" label="Updated On" options={dateFormat} showTime />
            <EditButton />
        </Datagrid>
    </List>
);
