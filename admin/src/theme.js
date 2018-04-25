import { createMuiTheme } from 'material-ui/styles';

export const theme = createMuiTheme({
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
        }
    }
});
