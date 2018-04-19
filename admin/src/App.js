import React, { Component } from 'react';
import { Admin, Resource, Delete } from 'react-admin';

import { UrgentActionCreate, UrgentActionEdit, UrgentActionList } from './urgentActions';
import dataProviderFactory from './dataProvider';

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
            <Admin dataProvider={dataProvider}>
                <Resource
                    name="Urgent Actions"
                    list={UrgentActionList}
                    edit={UrgentActionEdit}
                    create={UrgentActionCreate}
                    remove={Delete}
                />
            </Admin>
        );
    }
}

export default App;
