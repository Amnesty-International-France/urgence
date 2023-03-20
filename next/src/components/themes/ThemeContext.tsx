import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Component, createContext } from 'react';
import { compose, lifecycle } from 'recompose';
import React from 'react';

import { black, lightGrey, white, yellow } from './colors';

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
            // @ts-ignore guillaumep
            this.props.context.changeBackgroundColor({ backgroundColor: lightGrey });
        },
    }),
);

export const withYellowBackground = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            // @ts-ignore guillaumep
            this.props.context.changeBackgroundColor({ backgroundColor: yellow });
        },
    }),
);

export const withBlackLogo = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            // @ts-ignore guillaumep
            this.props.context.changeLogoColor({ logoColor: white, logoBackgroundColor: black });
        },
    }),
);

export const withYellowLogo = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            // @ts-ignore guillaumep
            this.props.context.changeLogoColor({ logoColor: black, logoBackgroundColor: yellow });
        },
    }),
);
