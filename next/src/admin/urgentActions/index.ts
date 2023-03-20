import { UrgentActionsCreate } from './UrgentActionsCreate';
import { UrgentActionsEdit } from './UrgentActionsEdit';
import { UrgentActionsList } from './UrgentActionsList';

const urgentActions = {
    name: 'urgent-actions',
    options: { label: 'Urgent actions' },
    list: UrgentActionsList,
    edit: UrgentActionsEdit,
    create: UrgentActionsCreate,
};

export default urgentActions;
