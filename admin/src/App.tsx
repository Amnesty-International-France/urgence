import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import { authProvider } from './authentication/authProvider';
import CustomLoginPage from './authentication/CustomLoginPage';
import { client } from './dataProvider';
import settings from './settings';
import { theme } from './theme';
import urgentActions from './urgentActions';

const App = () => {
    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    useEffect(() => {
        buildGraphQLProvider({ client }).then((graphQlDataProvider) =>
            setDataProvider(() => graphQlDataProvider),
        );
    }, []);

    return (
        <>
            <CssBaseline />
            {dataProvider ? (
                <Admin
                    theme={theme}
                    title="Réaction rapide"
                    dataProvider={dataProvider}
                    authProvider={authProvider}
                    loginPage={CustomLoginPage}
                    requireAuth
                >
                    <Resource {...urgentActions} />
                    <Resource {...settings} />
                </Admin>
            ) : (
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
            )}
        </>
    );
};

export default App;
