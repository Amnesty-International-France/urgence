import { Edit } from 'react-admin';
import ActionForm from './form';
import { UrgentActionsTitle } from './UrgentActionsTitle';

export const UrgentActionsEdit = () => {
    return (
        <Edit title={<UrgentActionsTitle />} component="div">
            <ActionForm />
        </Edit>
    );
};
