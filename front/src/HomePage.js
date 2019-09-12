import React from 'react';
import gql from 'graphql-tag';
import glamorous from 'glamorous';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import get from 'lodash.get';

import { withYellowLogo } from './themes/ThemeContext';
import { white } from './themes/colors';
import LoadingScreen from './themes/LoadingScreen';

import generateUrl from './services/generateUrl';

const styles = {
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
};

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
        {({ data, error, loading }) => {
            if (error) {
                console.error(error);
                return <Redirect to={generateUrl('error')} />;
            }

            if (loading) {
                return <LoadingScreen />;
            }

            const slug = get(data, 'UrgentAction.slug');
            return <Redirect to={generateUrl('ua', { slug })} />;
        }}
    </Query>
);

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default glamorous(withYellowLogo(HomePage))(styles);
