import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// @ts-expect-error TS(6142): Module './App' was resolved to '/home/guillaume/de... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.StrictMode>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <App client={client} />
    </React.StrictMode>,
);

// Should be loaded before React App
registerGA();
registerFB();

serviceWorkerRegistration.register();
