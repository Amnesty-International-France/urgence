import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';

import { MessageViewInput } from '../MessageViewInput';

const Part5MessageView = () => {
    return (
        <Box sx={{ backgroundColor: red[50] }}>
            <MessageViewInput source="message" />
        </Box>
    );
};

export default Part5MessageView;
