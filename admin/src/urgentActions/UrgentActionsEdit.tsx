import { alpha } from '@mui/material';
import { Edit, SaveButton, SimpleForm } from 'react-admin';
import { theme } from '../theme';
import { UrgentActionsForm } from './UrgentActionsForm';
import { UrgentActionsFormActions } from './UrgentActionsFormActions';
import { UrgentActionsTitle } from './UrgentActionsTitle';

export const UrgentActionsEdit = () => {
    return (
        <Edit actions={<UrgentActionsFormActions />} title={<UrgentActionsTitle />}>
            <SimpleForm>
                <SaveButton
                    sx={{
                        position: 'absolute',
                        right: '100px',
                        top: '56px',
                        backgroudColor: 'transparent',
                        boxShadow: 'none',
                        color: 'primary.main',
                        padding: '4px 5px',
                        '&.Mui-disabled': {
                            backgroundColor: 'transparent',
                        },
                        '&:not(.Mui-disabled)': {
                            backgroundColor: 'transparent',
                        },
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                            boxShadow: 'none',
                        },
                    }}
                />
                <UrgentActionsForm />
            </SimpleForm>
        </Edit>
    );
};
