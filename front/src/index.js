import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerGA from './analytics/registerGA';
import registerFB from './analytics/registerFB';

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache({ addTypename: false }),
});

// Should be loaded before React App
registerGA();
registerFB();

ReactDOM.render(<App client={client} />, document.getElementById('root'));
registerServiceWorker();
