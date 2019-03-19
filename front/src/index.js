import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerGA from './analytics/registerGA';

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache({ addTypename: false }),
});

registerGA();
ReactDOM.render(<App client={client} />, document.getElementById('root'));
registerServiceWorker();
