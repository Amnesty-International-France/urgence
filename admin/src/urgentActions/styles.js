import { white, pink } from '../../../front/src/themes/colors';
import { relative } from 'path';

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
                fontSize: '1.5em',
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
};

export const transitionScreenPreview = {
    ...preview,
    '& > div': {
        height: 'calc(100% - 120px)',
        width: 'calc(100% - 40px)',
        padding: '100px 20px 20px 20px',
    },
};

export const messageFormScreenPreview = {
    ...preview,
    '& > div': {
        width: 'calc(100% - 40px)',
        padding: '100px 20px 20px 20px',
    },
    '& .action': {
        backgroundColor: white,
        margin: 0,
        marginBottom: '-20px',
        marginLeft: '-20px',
        marginRight: '-20px',
        left: 0,
        width: 'calc(100% + 40px)',
        zIndex: 1000,
        position: 'sticky',
        bottom: 0,
        '& a': {
            width: '100%',
        }
    },
};

export const registerFormScreenPreview = {
    ...preview,
    '& > div': {
        width: 'calc(100% - 40px)',
        padding: '100px 20px 20px 20px',
        minHeight: 0,
        height: '480px',
    },
    '& .action': {
        backgroundColor: white,
        margin: 0,
        marginBottom: '-60px',
        marginLeft: '-20px',
        marginRight: '-20px',
        left: 0,
        width: 'calc(100% + 40px)',
        zIndex: 1000,
        bottom: 0,
        '& a': {
            width: '100%',
        }
    },
};
