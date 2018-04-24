import React from 'react';
import {
    Edit,
} from 'react-admin';

import UrgentActionTitle from './UrgentActionTitle';
import getUrgentActionFormFragment from './getUrgentActionFormFragment';

export default (props) => (
    <Edit title={<UrgentActionTitle />} {...props}>
        {getUrgentActionFormFragment({ edit: true })}
    </Edit>
);
