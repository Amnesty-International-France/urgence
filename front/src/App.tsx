import styled from '@emotion/styled';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Div100Vh from 'react-div-100vh';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// @ts-expect-error TS(6142): Module './analytics/Analytics' was resolved to '/h... Remove this comment to see the full error message
import Analytics from './analytics/Analytics';

// @ts-expect-error TS(6142): Module './ErrorPage' was resolved to '/home/guilla... Remove this comment to see the full error message
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import generateUrl from './services/generateUrl';
// @ts-expect-error TS(6142): Module './themes/AppBackground' was resolved to '/... Remove this comment to see the full error message
import AppBackground from './themes/AppBackground';
// @ts-expect-error TS(6142): Module './themes/AppLogo' was resolved to '/home/g... Remove this comment to see the full error message
import AppLogo from './themes/AppLogo';
// @ts-expect-error TS(6142): Module './themes/DesktopAlert' was resolved to '/h... Remove this comment to see the full error message
import DesktopAlert from './themes/DesktopAlert';
// @ts-expect-error TS(6142): Module './themes/RouterScrollToTop' was resolved t... Remove this comment to see the full error message
import RouterScrollToTop from './themes/RouterScrollToTop';
// @ts-expect-error TS(6142): Module './themes/ThemeContext' was resolved to '/h... Remove this comment to see the full error message
import { ThemeProvider } from './themes/ThemeContext';
// @ts-expect-error TS(6142): Module './urgentActions/UrgentAction' was resolved... Remove this comment to see the full error message
import UrgentAction from './urgentActions/UrgentAction';

export const Div100Vw = styled.div`
    & {
        width: '100vw';
    }
`;

const App = ({ className, client }: { className?: string; client: ApolloClient<unknown> }) => {
    useEffect(() => {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        document.getElementById('root').className = 'loaded';
    });

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ApolloProvider client={client}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ThemeProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Div100Vw>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Div100Vh className={className}>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <AppBackground />
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <AppLogo />
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <DesktopAlert />
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <BrowserRouter>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <RouterScrollToTop>
                                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <Routes>
                                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <Route
                                        path={generateUrl('home')}
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        element={<Analytics WrappedComponent={HomePage} />}
                                    />

                                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <Route
                                        path={generateUrl('error')}
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        element={<Analytics WrappedComponent={ErrorPage} />}
                                    />
                                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <Route
                                        path="/ua/:slug"
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        element={<Analytics WrappedComponent={UrgentAction} />}
                                    >
                                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        <Route
                                            path=":step"
                                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                            element={<Analytics WrappedComponent={UrgentAction} />}
                                        >
                                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                            <Route
                                                path=":page/*"
                                                element={
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                                    <Analytics WrappedComponent={UrgentAction} />
                                                }
                                            />
                                        </Route>
                                    </Route>
                                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <Route
                                        path="*"
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
