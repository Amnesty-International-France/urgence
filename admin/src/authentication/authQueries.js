import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { graphqlClientOptions } from '../dataProvider';

export const login = async (username, password) => new ApolloClient(graphqlClientOptions)
    .query({
        query: gql`{
            login(username: "${username}", password: "${password}") {
                token
            }
        }`
    })
    .then(({ data: { login } }) => login);
