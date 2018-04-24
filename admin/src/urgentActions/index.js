import {
    Delete,
} from 'react-admin';

import UrgentActionEdit from './UrgentActionEdit';
import UrgentActionCreate from './UrgentActionCreate';
import UrgentActionList from './UrgentActionList';

export default {
    name: 'Urgent Actions',
    list: UrgentActionList,
    edit: UrgentActionEdit,
    create: UrgentActionCreate,
    remove: Delete,
};
