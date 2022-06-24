import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { lifecycle, compose } from 'recompose';

import { black, white, yellow, lightGrey } from './colors';

const { Consumer, Provider } = createContext();

export class ThemeProvider extends Component {
    state = {
        backgroundColor: lightGrey,
        changeBackgroundColor: ({ backgroundColor }) => {
            this.setState({
                backgroundColor,
            });
        },
        logoColor: black,
        logoBackgroundColor: yellow,
        changeLogoColor: ({ logoColor, logoBackgroundColor }) => {
            this.setState({
                logoColor,
                logoBackgroundColor,
            });
        },
    };

    theme = createTheme({
        typography: {
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
                <Provider value={this.state}>{this.props.children}</Provider>
            </MuiThemeProvider>
        );
    }
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const ThemeConsumer = Consumer;

export const withThemeContext = (BaseComponent) => (props) =>
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
