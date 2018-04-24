import React from 'react';
import {
    Create,
} from 'react-admin';

import UrgentActionTitle from './UrgentActionTitle';
import getUrgentActionFormFragment from './getUrgentActionFormFragment';

export default (props) => (
    <Create title={<UrgentActionTitle />} {...props}>
        {getUrgentActionFormFragment({ edit: false })}
    </Create>
);
