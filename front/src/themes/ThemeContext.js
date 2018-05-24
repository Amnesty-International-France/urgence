import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import { lifecycle, compose } from 'recompose';

import { white } from './colors';

const { Consumer, Provider } = createContext();

export class ThemeProvider extends Component {
    state = {
        logoColor: white,
        changeLogoColor: color => {
            this.setState({ logoColor: color });
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
            this.props.context.changeLogoColor('#000');
        },
    }),
);
