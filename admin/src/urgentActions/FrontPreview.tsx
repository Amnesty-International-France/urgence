import Box from '@mui/material/Box';

type FrontPreviewProps = {
    children: React.ReactNode;
    previewDevice: 'mobile' | 'desktop';
};

export const FrontPreview = ({ children, previewDevice }: FrontPreviewProps) => {
    return (
        <Box
            sx={{
                height: previewDevice === 'mobile' ? 600 : 'auto',
                width: previewDevice === 'mobile' ? 375 : 'auto',
                maxWidth: previewDevice === 'mobile' ? 375 : 1088,
                aspectRatio: previewDevice === 'mobile' ? 'auto' : '1.8',
                margin: '1rem',
                overflow: 'auto',
                fontFamily: "'Amnesty Trade Gothic', 'Arial', sans-serif",
                backgroundColor: '#fff',
            }}
        >
            {children}
        </Box>
    );
};
