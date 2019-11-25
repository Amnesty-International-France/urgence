import { white, pink } from '../../../front/src/themes/colors';

export const root = {
    root: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    card: {
        margin: '1rem 1rem 2rem',
        width: 450,
    },
    avatar: {
        color: '#fff',
        backgroundColor: pink,
        marginTop: 16,
    },
    formContainer: {
        '& > div': {
            width: '100%',
            margin: 0,
            marginBottom: 25,
            '& > label': {
                fontSize: '1.4em',
                fontWeight: 'bold',
            },
        },
    },
};

export const preview = {
    height: 600,
    width: 375,
    margin: 16,
    overflow: 'auto',
    fontFamily: "'Amnesty Trade Gothic', 'Arial', sans-serif",
    backgroundColor: white,
};

export const storyScreenPreview = {
    ...preview,
    '& .story-step > div': {
        height: 'calc(600px - 80px) !important',
        width: 'calc(100% - 30px)',
    },
};

export const actScreenPreview = {
    ...preview,
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
};

export const messageFormScreenPreview = {
    ...preview,
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
};

export const registerFormScreenPreview = {
    ...preview,
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
};

export const sharingScreenPreview = {
    ...preview,
    '& .share': {
        height: 'calc(600px - 110px) !important',
        width: 'calc(100% - 30px)',
        '& .paper': {
            width: 'calc(100% - 40px)',
            padding: '100px 20px 20px 20px',
        },
    },
};

export const thanksEndScreenPreview = {
    ...preview,
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
};
