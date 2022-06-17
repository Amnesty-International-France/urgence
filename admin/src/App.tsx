import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import { authProvider } from './authentication/authProvider';
import CustomLoginPage from './authentication/CustomLoginPage';
import { client } from './dataProvider';
import settings from './settings';
import { theme } from './theme';

const App = () => {
    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    useEffect(() => {
        buildGraphQLProvider({ client }).then(graphQlDataProvider =>
            setDataProvider(() => graphQlDataProvider),
        );
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
            theme={theme}
            title="Réaction rapide"
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={CustomLoginPage}
            requireAuth
        >
            {/* <Resource
                name="UrgentAction"
                list={ListGuesser}
                options={{ label: 'Urgent Actions' }}
            /> */}
            <Resource {...settings} />
        </Admin>
    );
};

export default App;
