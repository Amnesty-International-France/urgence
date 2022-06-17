import CircularProgress from '@mui/material/CircularProgress';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { useEffect, useState } from 'react';
import { Admin, DataProvider, ListGuesser, Resource } from 'react-admin';
import { authProvider } from './authentication/authProvider';

const App = () => {
    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    useEffect(() => {
        buildGraphQLProvider({
            clientOptions: { uri: 'http://localhost:4000/graphql' },
        }).then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
    }, []);

    if (!dataProvider) {
        return <CircularProgress />;
    }

    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            <Resource name="Urgent Actions" list={ListGuesser} />
        </Admin>
    );
};

export default App;
