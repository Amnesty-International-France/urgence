import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import dataProviderFactory from './dataProvider';
import { authProvider } from './authentication/authProvider';

import activist from './activists';
import urgentAction from './urgentActions';

import { theme } from './theme';
import { Title } from './Title';

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
                theme={theme}
                title={<Title />}
                authProvider={authProvider}
                dataProvider={dataProvider}
            >
                <Resource {...urgentAction} />
                <Resource {...activist} />
            </Admin>
        );
    }
}

export default App;
