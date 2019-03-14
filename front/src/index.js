import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

ReactDOM.render(<App client={client} />, document.getElementById('root'));
registerServiceWorker();
