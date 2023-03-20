import { Create, SimpleForm } from 'react-admin';
import { UrgentActionsForm } from './UrgentActionsForm';

export const UrgentActionsCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <UrgentActionsForm />
            </SimpleForm>
        </Create>
    );
};
