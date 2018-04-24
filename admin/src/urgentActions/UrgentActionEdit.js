import React from 'react';
import {
    Edit,
} from 'react-admin';
import withStyles from 'material-ui/styles/withStyles';

import UrgentActionTitle from './UrgentActionTitle';
import getUrgentActionFormFragment from './getUrgentActionFormFragment';

const editStyles = {
    clear: { clear: 'both' },
};

export default withStyles(editStyles)(({ classes, ...props }) => (
    <Edit title={<UrgentActionTitle />} {...props}>
        {getUrgentActionFormFragment({ edit: true })}
    </Edit>
));
