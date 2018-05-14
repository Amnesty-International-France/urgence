import React from 'react';
import {
    CardActions,
    ListButton,
    DeleteButton,
} from 'react-admin';

import PreviewLink from './PreviewLink';
import PreviewLetter from './PreviewLetter';

export const UrgentActionsFormActions = ({ basePath, data, resource }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} resource={resource} />
        <PreviewLink record={data} />
        <PreviewLetter record={data} />
    </CardActions>
);
