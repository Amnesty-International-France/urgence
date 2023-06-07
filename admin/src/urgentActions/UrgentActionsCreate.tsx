import { Create, SimpleForm } from 'react-admin';
import ActionForm from './form';

export const UrgentActionsCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <ActionForm />
            </SimpleForm>
        </Create>
    );
};
