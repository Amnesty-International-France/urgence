import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-primitives';
import { ApolloProvider } from 'react-apollo';

import { Router, Route } from './gateway/ReactRouter';
import generateUrl from './services/generateUrl';
import Home from './Home';
import UrgentAction from './UrgentAction';

const App = ({ client }) => (
    <ApolloProvider client={client}>
        <Router>
            <View>
                <Route exact path={generateUrl('home')} component={Home} />
                <Route path={generateUrl('ua')} component={UrgentAction} />
            </View>
        </Router>
    </ApolloProvider>
);

App.propTypes = {
    client: PropTypes.object.isRequired,
};

export default App;
