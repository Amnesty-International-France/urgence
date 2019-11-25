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

export const sharingScreenPreview = {
    ...preview,
    '& > div': {
        width: 'calc(100% - 40px)',
        padding: '135px 20px 20px 20px',
    },
};

export const transitionScreenPreview = {
    ...preview,
    '& > div': {
        maxHeight: 'calc(100% - 120px)',
        height: 'calc(100% - 120px)',
        width: 'calc(100% - 40px)',
        padding: '0px 20px 0px 20px',
    },
};

export const messageFormScreenPreview = {
    ...preview,
    '& > div': {
        width: 'calc(100% - 40px)',
        padding: '135px 20px 20px 20px',
    },
    '& .action': {
        '& a': {
            width: '100%',
        },
    },
};

export const registerFormScreenPreview = {
    ...preview,
    '& > div': {
        width: 'calc(100% - 40px)',
        padding: '135px 20px 20px 20px',
    },
    '& .action': {
        '& a': {
            width: '100%',
        },
    },
};
