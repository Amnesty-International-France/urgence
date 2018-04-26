import React from 'react';
import {
    Edit,
} from 'react-admin';

import UrgentActionTitle from './UrgentActionTitle';
import getUrgentActionFormFragment from './getUrgentActionFormFragment';
import { UrgentActionsFormActions } from './UrgentActionsFormActions';

export default (props) => (
    <Edit
        actions={<UrgentActionsFormActions />}
        title={<UrgentActionTitle />} {...props}
    >
        {getUrgentActionFormFragment({ edit: true })}
    </Edit>
);
