import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { Admin, DataProvider, Resource, localStorageStore } from 'react-admin';
import { authProvider } from './authentication/authProvider';
import CustomLoginPage from './authentication/CustomLoginPage';
import { getApolloClient } from './dataProvider';
import settings from './settings';
import { theme } from './theme';
import urgentActions from './urgentActions';

const App = () => {
    const store = localStorageStore();
    const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
    useEffect(() => {
        getApolloClient().then((graphQlDataProvider) => setDataProvider(() => graphQlDataProvider));
        // Collapse left menu by default
        if (!store.getItem('sidebar.open')) {
            store.setItem(
                `sidebar.open`,
                false,
            );
        }
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
                    store={store}
                    requireAuth
                    disableTelemetry
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
