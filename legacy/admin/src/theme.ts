import { defaultTheme } from 'react-admin';

export const theme = {
    ...defaultTheme,
    palette: {
        primary: {
            light: '#ff549b',
            main: '#d2026d',
            dark: '#9b0042',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffff5a',
            main: '#ffff00',
            dark: '#c7cc00',
            contrastText: '#000',
        },
    },
    components: {
        ...defaultTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'standard' as const,
            },
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'standard' as const,
            },
        },
    },
};
