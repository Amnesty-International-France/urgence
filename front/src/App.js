import React, { Component } from 'react';
import { View } from 'react-primitives';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Router, Route } from './gateway/ReactRouter';
import generateUrl from './services/generateUrl';
import Home from './Home';
import UA from './UA';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <View>
                        <Route
                            exact
                            path={generateUrl('home')}
                            component={Home}
                        />
                        <Route path={generateUrl('ua')} component={UA} />
                    </View>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;
