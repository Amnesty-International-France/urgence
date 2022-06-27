import React, { createContext, Component } from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { lifecycle, compose } from 'recompose';

import { black, white, yellow, lightGrey } from './colors';

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
const { Consumer, Provider } = createContext();

type ThemeProviderProps = {};

type ThemeProviderState = any;

export class ThemeProvider extends Component<ThemeProviderProps, ThemeProviderState> {
    state = {
        backgroundColor: lightGrey,
        changeBackgroundColor: ({ backgroundColor }: any) => {
            this.setState({
                backgroundColor,
            });
        },
        logoColor: black,
        logoBackgroundColor: yellow,
        changeLogoColor: ({ logoColor, logoBackgroundColor }: any) => {
            this.setState({
                logoColor,
                logoBackgroundColor,
            });
        },
    };

    theme = createTheme({
        typography: {
            // @ts-expect-error TS(2322): Type '{ useNextVariants: true; }' is not assignabl... Remove this comment to see the full error message
            useNextVariants: true,
        },
        palette: {
            primary: {
                500: white,
            },
        },
    });

    render() {
        return (
            <MuiThemeProvider theme={this.theme}>
                <Provider value={this.state}>{(this.props as any).children}</Provider>
            </MuiThemeProvider>
        );
    }
}

export const ThemeConsumer = Consumer;

export const withThemeContext = (BaseComponent: any) => (props: any) =>
    <ThemeConsumer>{(context) => <BaseComponent context={context} {...props} />}</ThemeConsumer>;

export const withLightGreyBackground = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            this.props.context.changeBackgroundColor({ backgroundColor: lightGrey });
        },
    }),
);

export const withYellowBackground = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            this.props.context.changeBackgroundColor({ backgroundColor: yellow });
        },
    }),
);

export const withBlackLogo = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            this.props.context.changeLogoColor({ logoColor: white, logoBackgroundColor: black });
        },
    }),
);

export const withYellowLogo = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            this.props.context.changeLogoColor({ logoColor: black, logoBackgroundColor: yellow });
        },
    }),
);
