import React from 'react';
import { Datagrid, List, Responsive, TextField, DateField } from 'react-admin';

const dateFormat = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const sort = { field: 'created_on', order: 'DESC' };

export default props => (
    <List {...props} title="Activists" sort={sort} perPage={25}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <DateField
                        source="created_on"
                        label="Created On"
                        options={dateFormat}
                        showTime
                    />
                    <TextField source="email" />
                    <TextField source="firstname" />
                    <TextField source="lastname" />
                    <TextField source="phone" />
                </Datagrid>
            }
        />
    </List>
);
