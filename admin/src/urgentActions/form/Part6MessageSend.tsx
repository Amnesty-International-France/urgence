import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';

import { MessageSendInput } from '../MessageSendInput';

const Part6MessageSend = () => {
    return (
        <Box sx={{ backgroundColor: red[50] }}>
            <MessageSendInput source="message" />
        </Box>
    );
};

export default Part6MessageSend;
