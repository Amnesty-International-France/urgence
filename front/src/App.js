import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Switch } from 'react-router-dom';

import { Router, Route } from './gateway/ReactRouter';
import generateUrl from './services/generateUrl';
import UrgentAction from './urgentActions/UrgentAction';
import Home from './Home';
import glamorous from 'glamorous';

export const styles = {
    '&': {
        height: '100vh',
        width: '100vw',
    },
};

const App = ({ className, client }) => (
    <ApolloProvider client={client}>
        <div className={className}>
            <Router>
                <Switch>
                    <Route exact path={generateUrl('home')} component={Home} />
                    <Route path={'/ua/:id/:step?/:page?'} component={UrgentAction} />
                </Switch>
            </Router>
        </div>
    </ApolloProvider>
);

App.propTypes = {
    className: PropTypes.string.isRequired,
    client: PropTypes.object.isRequired,
};

export default glamorous(App)(styles);
