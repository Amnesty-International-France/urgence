import { Edit, SimpleForm } from 'react-admin';
import { UrgentActionsForm } from './UrgentActionsForm';
import { UrgentActionsFormActions } from './UrgentActionsFormActions';
import { UrgentActionsTitle } from './UrgentActionsTitle';

export const UrgentActionsEdit = () => {
    return (
        <Edit actions={<UrgentActionsFormActions />} title={<UrgentActionsTitle />}>
            <SimpleForm>
                <UrgentActionsForm />
            </SimpleForm>
        </Edit>
    );
};
