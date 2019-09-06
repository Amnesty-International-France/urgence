import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import JssProvider from 'react-jss/lib/JssProvider';
import { CircularProgress } from '@material-ui/core';

import generateClassName from './generateClassName';
import dataProviderFactory from './dataProvider';
import { authProvider } from './authentication/authProvider';

import urgentAction from './urgentActions';
import settings from './settings';

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
            return <CircularProgress />;
        }

        return (
            <JssProvider generateClassName={generateClassName}>
                <Admin
                    locale="en"
                    theme={theme}
                    title={<Title />}
                    authProvider={authProvider}
                    dataProvider={dataProvider}
                >
                    <Resource {...urgentAction} />
                    <Resource {...settings} />
                </Admin>
            </JssProvider>
        );
    }
}

export default App;
