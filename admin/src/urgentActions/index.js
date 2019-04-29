import ViewListIcon from '@material-ui/icons/ViewList';

import UrgentActionEdit from './UrgentActionEdit';
import UrgentActionCreate from './UrgentActionCreate';
import UrgentActionList from './UrgentActionList';

export default {
    name: 'Urgent Actions',
    icon: ViewListIcon,
    list: UrgentActionList,
    edit: UrgentActionEdit,
    create: UrgentActionCreate,
};
