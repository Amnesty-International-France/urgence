import { Create, SimpleForm } from 'react-admin';
import ActionForm from './form';

export const UrgentActionsCreate = () => {
    return (
        <Create component="div">
            <SimpleForm>
                <ActionForm />
            </SimpleForm>
        </Create>
    );
};
