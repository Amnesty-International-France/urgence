import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lifecycle, compose } from 'recompose';

import { black, yellow } from './colors';

const { Consumer, Provider } = createContext();

export class ThemeProvider extends Component {
    state = {
        color: black,
        backgroundColor: yellow,
        changeLogoColor: ({ color, backgroundColor }) => {
            this.setState({
                color,
                backgroundColor,
            });
        },
    };

    theme = createMuiTheme({
        palette: {
            primary: { 500: black },
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
            this.props.context.changeLogoColor({ color: yellow, backgroundColor: black });
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
