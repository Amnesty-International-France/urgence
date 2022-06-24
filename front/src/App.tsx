import styled from '@emotion/styled';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Div100Vh from 'react-div-100vh';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Analytics from './analytics/Analytics';

import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import generateUrl from './services/generateUrl';
import AppBackground from './themes/AppBackground';
import AppLogo from './themes/AppLogo';
import DesktopAlert from './themes/DesktopAlert';
import RouterScrollToTop from './themes/RouterScrollToTop';
import { ThemeProvider } from './themes/ThemeContext';
import UrgentAction from './urgentActions/UrgentAction';

export const Div100Vw = styled.div`
    & {
        width: '100vw';
    }
`;

const App = ({ className, client }: { className?: string; client: ApolloClient<unknown> }) => {
    useEffect(() => {
        // @ts-ignore
        document.getElementById('root').className = 'loaded';
    });

    return (
        <ApolloProvider client={client}>
            <ThemeProvider>
                <Div100Vw>
                    <Div100Vh className={className}>
                        <AppBackground />
                        <AppLogo />
                        <DesktopAlert />
                        <BrowserRouter>
                            <RouterScrollToTop>
                                <Routes>
                                    <Route
                                        path={generateUrl('home')}
                                        element={<Analytics WrappedComponent={HomePage} />}
                                    />

                                    <Route
                                        path={generateUrl('error')}
                                        element={<Analytics WrappedComponent={ErrorPage} />}
                                    />
                                    <Route
                                        path="/ua/:slug/:step?/:page?*"
                                        element={<Analytics WrappedComponent={UrgentAction} />}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate to={generateUrl('error')} />}
                                    />
                                </Routes>
                            </RouterScrollToTop>
                        </BrowserRouter>
                    </Div100Vh>
                </Div100Vw>
            </ThemeProvider>
        </ApolloProvider>
    );
};

App.propTypes = {
    className: PropTypes.string,
    client: PropTypes.object.isRequired,
};

export default App;
