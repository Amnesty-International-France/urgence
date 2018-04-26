import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import JssProvider from 'react-jss/lib/JssProvider';
import createHistory from 'history/createBrowserHistory';

import urgentAction from './urgentActions';
import dataProviderFactory from './dataProvider';
import { authProvider } from './authentication/authProvider';
import { generateClassName } from './generateClassName';

import { theme } from './theme';
import { Title } from './Title';

const history = createHistory();

class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {
        const dataProvider = await dataProviderFactory();

        this.setState({ dataProvider });
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <JssProvider generateClassName={generateClassName}>
                <Admin
                    locale="en"
                    theme={theme}
                    history={history}
                    title={<Title />}
                    authProvider={authProvider}
                    dataProvider={dataProvider}
                >
                    <Resource {...urgentAction} />
                </Admin>
            </JssProvider>
        );
    }
}

export default App;
