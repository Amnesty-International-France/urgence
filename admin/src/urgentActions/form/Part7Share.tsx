import Box from '@mui/material/Box';
import { teal } from '@mui/material/colors';
import { ShareInput } from '../ShareInput';

export const Part7Share = () => {
    return (
        <Box sx={{ backgroundColor: teal[50] }}>
            <p>Share (only for members already registered)</p>
            <ShareInput source="email_thank" />
        </Box>
    );
};

export default Part7Share;
