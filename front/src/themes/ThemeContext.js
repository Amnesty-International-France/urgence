import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lifecycle, compose } from 'recompose';

import { black, white, yellow, lightGrey } from './colors';

const { Consumer, Provider } = createContext();

export class ThemeProvider extends Component {
    state = {
        backgroundColor: lightGrey,
        changeBackgroundColor: ({ backgroundColor }) => {
            this.setState({ backgroundColor });
        },
        logoColor: black,
        logoBackgroundColor: yellow,
        changeLogoColor: ({ logoColor, logoBackgroundColor }) => {
            this.setState({ logoColor, logoBackgroundColor });
        },
    };

    theme = createMuiTheme({
        palette: {
            primary: { 500: white },
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

export const withThemeContext = BaseComponent => props => (
    <ThemeConsumer>{context => <BaseComponent context={context} {...props} />}</ThemeConsumer>
);

export const withBlackLogo = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            this.props.context.changeLogoColor({ color: white, backgroundColor: black });
        },
    }),
);

export const withYellowLogo = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            this.props.context.changeLogoColor({ color: black, backgroundColor: yellow });
        },
    }),
);
