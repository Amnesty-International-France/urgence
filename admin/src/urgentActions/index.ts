import { UrgentActionsCreate } from './UrgentActionsCreate';
// import { UrgentActionsEdit } from './UrgentActionsEdit';
import Edit from './Edit-v2';
import { UrgentActionsList } from './UrgentActionsList';

const urgentActions = {
    name: 'UrgentAction',
    options: { label: 'Urgent actions' },
    list: UrgentActionsList,
    edit: Edit,
    create: UrgentActionsCreate,
};

export default urgentActions;
