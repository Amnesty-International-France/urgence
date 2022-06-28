import * as recompose from 'recompose';
import * as _material_ui_core_styles from '@material-ui/core/styles';
import React, { Component } from 'react';
import * as _emotion_styled from '@emotion/styled';
import * as _emotion_react from '@emotion/react';

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
    theme: _material_ui_core_styles.Theme;
    render(): JSX.Element;
}
declare const ThemeConsumer: React.Consumer<unknown>;
declare const withThemeContext: (BaseComponent: any) => (props: any) => JSX.Element;
declare const withLightGreyBackground: recompose.ComponentEnhancer<unknown, unknown>;
declare const withYellowBackground: recompose.ComponentEnhancer<unknown, unknown>;
declare const withBlackLogo: recompose.ComponentEnhancer<unknown, unknown>;
declare const withYellowLogo: recompose.ComponentEnhancer<unknown, unknown>;

declare const _default$3: _emotion_styled.StyledComponent<any, {}, {}>;

declare type Props$1 = {
    children: (...args: any[]) => any;
    className?: string;
    step?: any;
};
declare const _default$2: _emotion_styled.StyledComponent<Props$1 & {
    theme?: _emotion_react.Theme | undefined;
}, {}, {}>;

declare type Props = {
    className?: string;
};
declare const _default$1: _emotion_styled.StyledComponent<Props & {
    theme?: _emotion_react.Theme | undefined;
}, {}, {}>;

declare type StoryCoverProps = {
    className?: string;
    content: string;
    medium?: {
        src: string;
    };
    mediumDesktop?: {
        src: string;
    };
    isMobile?: boolean;
};
declare const _default: _emotion_styled.StyledComponent<StoryCoverProps & {
    theme?: _emotion_react.Theme | undefined;
}, {}, {}>;

export { _default$3 as AppLogo, _default as StoryCover, _default$2 as StorySlide, _default$1 as StoryStep, ThemeConsumer, ThemeProvider, withBlackLogo, withLightGreyBackground, withThemeContext, withYellowBackground, withYellowLogo };
