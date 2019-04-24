import { gql } from 'apollo-server-express';

import activistsTypeDefs from '../activists/typeDefs';
import userTypeDefs from '../users/typeDefs';
import urgentActionsTypeDefs from '../urgentActions/typeDefs';

// @see https://marmelab.com/blog/2017/09/06/dive-into-graphql-part-iii-building-a-graphql-server-with-nodejs.html#composing-schemas
const baseTypeDefs = gql`
    scalar DATE

    type Query {
        dummy: Boolean
    }

    type Mutation {
        dummy: Boolean
    }
`;

export const typeDefs = [baseTypeDefs, activistsTypeDefs, urgentActionsTypeDefs, userTypeDefs];
