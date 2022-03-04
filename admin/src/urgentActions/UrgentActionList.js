import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    Responsive,
    TextField,
    BooleanField,
    DateField,
} from 'react-admin';

import dateFormat from '../dateFormat';
import PreviewLink from './PreviewLink';
import PreviewLetter from './PreviewLetter';

const sort = { field: 'last_edition_date', order: 'DESC' };

export default props => (
    <List {...props} title="Urgent Actions" sort={sort} perPage={25}>
        <Responsive
            medium={
                <Datagrid>
                    <TextField source="title" />
                    <TextField source="campaign_code" label="Campaign Code" />
                    <TextField source="origin_code" label="Origin Code" />
                    <DateField
                        showTime
                        label="Last Updated"
                        options={dateFormat}
                        source="last_edition_date"
                    />
                    <BooleanField source="is_default" label="Set As Default" />
                    <TextField source="response_count" />
                    <EditButton />
                    <PreviewLink />
                    <PreviewLetter />
                </Datagrid>
            }
        />
    </List>
);
