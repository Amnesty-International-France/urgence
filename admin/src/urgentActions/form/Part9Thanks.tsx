import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import { ThanksInput } from '../ThanksInput';

export const Part9Thanks = () => {
    return (
        <Box sx={{ backgroundColor: green[50] }}>
            <ThanksInput source="end_thank" />
        </Box>
    );
};

export default Part9Thanks;
