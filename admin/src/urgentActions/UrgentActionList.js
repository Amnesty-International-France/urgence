import React from 'react';
import { Datagrid, EditButton, List, Responsive, TextField, DateField } from 'react-admin';

import PreviewLink from './PreviewLink';
import PreviewLetter from './PreviewLetter';

const dateFormat = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const sort = { field: 'last_edition_date', order: 'DESC' };

export default props => (
    <List {...props} title={'Urgent Actions'} sort={sort} perPage={25}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="title" />
                    <DateField
                        showTime
                        label="Last Updated"
                        options={dateFormat}
                        source="last_edition_date"
                    />
                    <EditButton />
                    <PreviewLink />
                    <PreviewLetter />
                </Datagrid>
            }
        />
    </List>
);
