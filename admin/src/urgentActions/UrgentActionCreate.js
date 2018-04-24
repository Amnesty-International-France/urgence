import React from 'react';
import {
    Create,
} from 'react-admin';
import withStyles from 'material-ui/styles/withStyles';

import UrgentActionTitle from './UrgentActionTitle';
import getUrgentActionFormFragment from './getUrgentActionFormFragment';

const createtyles = {
    width: { width: '5em' },
    widthFormGroup: { display: 'inline-block' },
    height: { width: '5em' },
    heightFormGroup: { display: 'inline-block', marginLeft: 32 },
};

export default withStyles(createtyles)(({ classes, ...props }) => (
    <Create title={<UrgentActionTitle />} {...props}>
        {getUrgentActionFormFragment({ edit: false })}
    </Create>
));
