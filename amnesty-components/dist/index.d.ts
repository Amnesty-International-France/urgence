import * as recompose from 'recompose';
import * as _mui_material_styles from '@mui/material/styles';
import React, { Component } from 'react';
import * as _emotion_styled from '@emotion/styled';

declare type ThemeProviderProps = {};
declare type ThemeProviderState = any;
declare class ThemeProvider extends Component<ThemeProviderProps, ThemeProviderState> {
    state: {
        backgroundColor: string;
        changeBackgroundColor: ({ backgroundColor }: any) => void;
        logoColor: string;
        logoBackgroundColor: string;
        changeLogoColor: ({ logoColor, logoBackgroundColor }: any) => void;
    };
    theme: _mui_material_styles.Theme;
    render(): JSX.Element;
}
declare const ThemeConsumer: React.Consumer<unknown>;
declare const withThemeContext: (BaseComponent: any) => (props: any) => JSX.Element;
declare const withLightGreyBackground: recompose.ComponentEnhancer<unknown, unknown>;
declare const withYellowBackground: recompose.ComponentEnhancer<unknown, unknown>;
declare const withBlackLogo: recompose.ComponentEnhancer<unknown, unknown>;
declare const withYellowLogo: recompose.ComponentEnhancer<unknown, unknown>;

declare const _default: _emotion_styled.StyledComponent<any, {}, {}>;

declare const transparent = "transparent";
declare const black = "#000";
declare const white = "#fff";
declare const yellow = "#ff0";
declare const pink = "rgba(210, 3, 109, 1)";
declare const orange = "#ef8200";
declare const green = "green";
declare const grey = "#ddd";
declare const lightGrey = "#f2f2f2";
declare const darkGrey = "#b7b7b7";
declare const colors: {
    transparent: string;
    black: string;
    white: string;
    yellow: string;
    pink: string;
    orange: string;
    green: string;
    grey: string;
    lightGrey: string;
    darkGrey: string;
};

declare const AmnestyLogo: any;

export { AmnestyLogo, _default as AppLogo, ThemeConsumer, ThemeProvider, black, colors, darkGrey, green, grey, lightGrey, orange, pink, transparent, white, withBlackLogo, withLightGreyBackground, withThemeContext, withYellowBackground, withYellowLogo, yellow };
