import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

describe('App', () => {
    let client;
    beforeAll(() => {
        const typeDefs = `
        type UrgentAction {
            id: ID
            title: String
        }

        type Query {
            UrgentAction: UrgentAction
        }
        `;
        const mocks = {
            UrgentAction: () => null,
        };

        const schema = makeExecutableSchema({ typeDefs });
        addMockFunctionsToSchema({ schema, mocks });
        const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

        // const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

        client = new ApolloClient({
            cache: apolloCache,
            link: new SchemaLink({ schema }),
        });

        console.log({ client });
    });
    it('renders without crashing', () => {
        const rendered = renderer.create(<App client={client} />).toJSON();
        expect(rendered).toBeTruthy();
    });
});
