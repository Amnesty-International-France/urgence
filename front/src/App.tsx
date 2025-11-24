import { ApolloClient, ApolloProvider } from '@apollo/client';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Div100Vh from 'react-div-100vh';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AppLogo, ThemeProvider } from 'amnesty-components';
import { HelmetProvider } from 'react-helmet-async';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import generateUrl from './services/generateUrl';
import DesktopAlert from './themes/DesktopAlert';
import RouterScrollToTop from './themes/RouterScrollToTop';
import UrgentAction from './urgentActions/UrgentAction';

export const Div100Vw = styled.div`
    & {
        width: 100vw;
    }
`;

const App = ({ className, client }: { className?: string; client: ApolloClient<unknown> }) => {
    useEffect(() => {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        document.getElementById('root').className = 'loaded';
    });

    useEffect(() => {
        const adsId = process.env.REACT_APP_GOOGLE_ADS_ID;

        if (!adsId) {
            console.warn('REACT_APP_GOOGLE_ADS_ID manquant !');
            return;
        }

        document.head.insertAdjacentHTML(
            'afterbegin',
            `
        <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!=='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${adsId});</script>
<!-- End Google Tag Manager -->
`,
        );

        document.body.insertAdjacentHTML(
            'afterbegin',
            `
    <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=${adsId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->
  `,
        );
    }, []);

    return (
        <HelmetProvider>
            <ApolloProvider client={client}>
                <ThemeProvider>
                    <Div100Vw>
                        <Div100Vh className={className}>
                            <AppLogo />
                            <DesktopAlert />
                            <BrowserRouter>
                                <RouterScrollToTop>
                                    <Routes>
                                        <Route path={generateUrl('home')} element={<HomePage />} />
                                        <Route
                                            path={generateUrl('error')}
                                            element={<ErrorPage />}
                                        />
                                        <Route path="/ua/:slug" element={<UrgentAction />}>
                                            <Route path=":step" element={<UrgentAction />}>
                                                <Route path=":page/*" element={<UrgentAction />} />
                                            </Route>
                                        </Route>
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
        </HelmetProvider>
    );
};

App.propTypes = {
    className: PropTypes.string,
    client: PropTypes.object.isRequired,
};

export default App;
