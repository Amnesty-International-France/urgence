import React from 'react';
import ReactDOM from 'react-dom/client';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import registerGA from './analytics/registerGA';
import registerFB from './analytics/registerFB';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache({ addTypename: false }),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App client={client} />
    </React.StrictMode>,
);

// Should be loaded before React App
registerGA();
registerFB();

serviceWorkerRegistration.register();
