import Box from '@mui/material/Box';
import { yellow } from '@mui/material/colors';

import { CallToActionInput } from '../CallToActionInput';

export const Part4CallToAction = () => {
    return (
        <Box sx={{ backgroundColor: yellow[50] }}>
            <CallToActionInput />
        </Box>
    );
};

export default Part4CallToAction;
