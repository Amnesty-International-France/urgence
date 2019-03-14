import { UrgentActionsResolver } from '../urgentActions/resolvers';
import { UsersResolvers } from '../users/resolvers';

export const resolvers = { ...UrgentActionsResolver, ...UsersResolvers };
