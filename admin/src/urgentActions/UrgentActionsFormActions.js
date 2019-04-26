import React from 'react';
import { CardActions } from 'react-admin';

import PreviewLink from './PreviewLink';
import PreviewLetter from './PreviewLetter';

export const UrgentActionsFormActions = ({ data }) => (
    <CardActions>
        <PreviewLink record={data} />
        <PreviewLetter record={data} />
    </CardActions>
);
