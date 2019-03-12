import { pink } from '../../../front/src/themes/colors';

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
