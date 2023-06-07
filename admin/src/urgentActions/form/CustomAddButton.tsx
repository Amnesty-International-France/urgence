import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Button from '@mui/material/Button';

export const CustomAddButton = (props: any) => (
    <Button
        color="primary"
        size="small"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        role="button"
        {...props}
    >
        Add a new story step
    </Button>
);
