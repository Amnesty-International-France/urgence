import React from 'react';
import { CardActions } from 'react-admin';

import PreviewLink from './PreviewLink';
import PreviewLetter from './PreviewLetter';

export const UrgentActionsFormActions = ({ basePath, data, resource }) => (
    <CardActions>
        <PreviewLink record={data} />
        <PreviewLetter record={data} />
    </CardActions>
);
