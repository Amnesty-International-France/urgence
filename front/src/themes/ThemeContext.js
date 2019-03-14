import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import { lifecycle, compose } from 'recompose';

import { black, yellow } from './colors';

const { Consumer, Provider } = createContext();

export class ThemeProvider extends Component {
    state = {
        logoColor: black,
        backgroundColor: yellow,
        changeLogoColor: ({ color, backgroundColor }) => {
            this.setState({
                color,
                backgroundColor,
            });
        },
    };

    render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
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

export const withWhiteLogo = compose(
    withThemeContext,
    lifecycle({
        componentDidMount() {
            this.props.context.changeLogoColor({ color: black, backgroundColor: yellow });
        },
    }),
);
