import styled from '@emotion/styled';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { Query } from '@apollo/client/react/components';
import { Navigate } from 'react-router-dom';

import LoadingScreen from './themes/LoadingScreen';

import generateUrl from './services/generateUrl';
import { ApolloError } from '@apollo/client';

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
    <Query query={query}>
        {({ data, loading, error }: { data: any; loading: boolean; error?: ApolloError }) => {
            if (error) {
                console.error(error);
                return <Navigate to={generateUrl('error')} />;
            }

            if (loading) {
                return (
                    <Div>
                        <LoadingScreen />
                    </Div>
                );
            }

            const slug = get(data, 'UrgentAction.slug');
            return <Navigate to={generateUrl('ua', { slug })} />;
        }}
    </Query>
);

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
