import Box from '@mui/material/Box';
import { ThemeProvider, AppLogo } from 'amnesty-components';

type FrontPreviewProps = {
    children: React.ReactNode;
    previewDevice: 'mobile' | 'desktop';
};

export const FrontPreview = ({ children, previewDevice }: FrontPreviewProps) => {
    return (
        <Box
            sx={{
                height: 600,
                width: previewDevice === 'mobile' ? 375 : 850,
                margin: '1rem',
                overflow: 'auto',
                fontFamily: "'Amnesty Trade Gothic', 'Arial', sans-serif",
                backgroundColor: '#fff',
                '@media (min-width: 1024px)': {
                    '& .story-step .rich-text': {
                        fontSize: '18px !important',
                    },
                    '& .story-step .rich-text > p': {
                        fontSize: '18px !important',
                    },
                    '& .story-step .ql-size-large,  & .story-step h2': {
                        padding: '4px 0 !important',
                        fontSize: '26px !important',
                        lineHeight: '39px !important',
                    },
                    '& .story-step .ql-size-huge, & .story-step h1': {
                        padding: '6px 0 !important',
                        fontSize: '36px !important',
                        lineHeight: '54px !important',
                    },
                },
                '& .story-step > div': {
                    height: 'calc(600px - 80px) !important',
                    width: 'calc(100% - 30px)',
                },
                '& .act': {
                    height: 'calc(600px - 80px) !important',
                    width: 'calc(100% - 30px) !important',
                    '& .paper': {
                        width: 'calc(100% - 40px)',
                        padding: '0px 20px',
                    },
                    '& .actions': {
                        '& a': {
                            width: '100%',
                        },
                    },
                },
                '& .message-send, .message-view': {
                    height: 'calc(600px - 110px) !important',
                    width: 'calc(100% - 30px)',
                    '& .paper': {
                        width: 'calc(100% - 40px)',
                        padding: '100px 20px 20px 20px',
                    },
                    '& .action': {
                        '& a': {
                            width: '100%',
                        },
                    },
                },
                '& .register': {
                    height: 'calc(600px - 110px) !important',
                    width: 'calc(100% - 30px)',
                    '& .paper': {
                        width: 'calc(100% - 40px)',
                        padding: '100px 20px 20px 20px',
                    },
                    '& .action': {
                        '& a': {
                            width: '100%',
                        },
                    },
                },
                '& .share': {
                    height: 'calc(600px - 110px) !important',
                    width: 'calc(100% - 30px)',
                    '& .paper': {
                        width: 'calc(100% - 40px)',
                        padding: '100px 20px 20px 20px',
                    },
                },
                '& .thank': {
                    height: 'calc(600px - 80px) !important',
                    width: 'calc(100% - 30px)',
                    '& .paper': {
                        width: 'calc(100% - 40px)',
                        padding: '0px 20px',
                    },
                    '& .actions': {
                        '& a': {
                            width: '100%',
                        },
                    },
                },
            }}
        >
            <ThemeProvider>
                <Box
                    sx={{
                        position: 'relative',
                        width: 'fit-content !important',
                        height: 'fit-content !important',
                        padding: '0px !important',
                    }}
                >
                    <AppLogo />
                </Box>
                {children}
            </ThemeProvider>
        </Box>
    );
};
