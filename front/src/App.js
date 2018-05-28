import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Switch } from 'react-router-dom';
import glamorous from 'glamorous';
import Div100Vh from 'react-div-100vh';

import { Router, Route } from './gateway/ReactRouter';
import generateUrl from './services/generateUrl';
import UrgentAction from './urgentActions/UrgentAction';
import Home from './Home';
import AppLogo from './themes/AppLogo';
import { ThemeProvider } from './themes/ThemeContext';

export const styles = {
    '&': {
        width: '100vw',
    },
};

const App = ({ className, client }) => (
    <ApolloProvider client={client}>
        <ThemeProvider>
            <Div100Vh className={className}>
                <AppLogo />
                <Router>
                    <Switch>
                        <Route exact path={generateUrl('home')} component={Home} />
                        <Route path={'/ua/:id/:step?/:page?'} component={UrgentAction} />
                    </Switch>
                </Router>
            </Div100Vh>
        </ThemeProvider>
    </ApolloProvider>
);

App.propTypes = {
    className: PropTypes.string.isRequired,
    client: PropTypes.object.isRequired,
};

export default glamorous(App)(styles);
