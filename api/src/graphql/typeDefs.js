import gql from 'graphql-tag';

import { userTypeDefs } from '../users/typeDefs';
import { urgentActionsTypeDefs } from '../urgentActions/typeDefs';

// @see https://marmelab.com/blog/2017/09/06/dive-into-graphql-part-iii-building-a-graphql-server-with-nodejs.html#composing-schemas
const baseTypeDefs = gql`
    type Query {
        dummy: Boolean
    }

    type Mutation {
        dummy: Boolean
    }
`;

export const typeDefs = [baseTypeDefs, urgentActionsTypeDefs, userTypeDefs];
