import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { useEffect, useState } from 'react';
import { Admin, DataProvider, ListGuesser, Resource } from 'react-admin';
import { authProvider } from './authentication/authProvider';
import CustomLoginPage from './authentication/CustomLoginPage';

const App = () => {
    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    useEffect(() => {
        buildGraphQLProvider({
            clientOptions: { uri: 'http://localhost:4000/graphql' },
        }).then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
    }, []);

    if (!dataProvider) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={CustomLoginPage}
            requireAuth
        >
            <Resource name="Urgent Actions" list={ListGuesser} />
        </Admin>
    );
};

export default App;
