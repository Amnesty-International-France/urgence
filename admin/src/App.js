import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import urgentAction from './urgentActions';
import dataProviderFactory from './dataProvider';
import { authProvider } from './authentication/authProvider';

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
            <Admin
                locale="en"
                authProvider={authProvider}
                dataProvider={dataProvider}
            >
                <Resource {...urgentAction} />
            </Admin>
        );
    }
}

export default App;
