import { gql } from 'apollo-server-express';

import userTypeDefs from '../users/typeDefs';
import urgentActionsTypeDefs from '../urgentActions/typeDefs';
import settingsTypeDefs from '../settings/typeDefs';

// @see https://marmelab.com/blog/2017/09/06/dive-into-graphql-part-iii-building-a-graphql-server-with-nodejs.html#composing-schemas
const baseTypeDefs = gql(`
    scalar DATE

    type ListMetadata {
        count: Int!
    }

    type Query {
        dummy: Boolean
    }

    type Mutation {
        dummy: Boolean
    }
`);

export default [baseTypeDefs, urgentActionsTypeDefs, userTypeDefs, settingsTypeDefs];
