import Box from '@mui/material/Box';
import { teal } from '@mui/material/colors';
import { RegisterInput } from '../RegisterInput';

export const Part8Register = () => {
    return (
        <Box sx={{ backgroundColor: teal[50] }}>
            <p>Register (for new members)</p>
            <RegisterInput source="register" />
        </Box>
    );
};

export default Part8Register;
