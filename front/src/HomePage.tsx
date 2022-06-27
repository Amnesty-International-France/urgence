import styled from '@emotion/styled';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { Query } from '@apollo/client/react/components';
import { Navigate } from 'react-router-dom';

import LoadingScreen from './themes/LoadingScreen';

import generateUrl from './services/generateUrl';

const Div = styled.div`
    fontSize: 33,
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    width: '100vw',
    height: '100vh',
    '& .not-found': {
        color: white,
        margin: 30,
    },
    '& .candle': {
        fill: white,
        fontSize: 133,
    },
`;

const query = gql`
    {
        UrgentAction: DefaultUrgentAction {
            id
            title
            slug
        }
    }
`;

const HomePage = () => (
    // @ts-expect-error TS(2314): Generic type 'Query<TData, TVariables>' requires 2... Remove this comment to see the full error message
    <Query query={query}>
        // @ts-expect-error TS(2349): This expression is not callable.
        {({ data, error, loading }) => {
            // @ts-expect-error TS(2552): Cannot find name 'error'. Did you mean 'Error'?
            if (error) {
                // @ts-expect-error TS(2552): Cannot find name 'error'. Did you mean 'Error'?
                console.error(error);
                return <Navigate to={generateUrl('error')} />;
            }

            // @ts-expect-error TS(2304): Cannot find name 'loading'.
            if (loading) {
                return (
                    <Div>
                        <LoadingScreen />
                    </Div>
                );
            }

            // @ts-expect-error TS(2304): Cannot find name 'data'.
            const slug = get(data, 'UrgentAction.slug');
            return <Navigate to={generateUrl('ua', { slug })} />;
        }}
    </Query>
);

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
