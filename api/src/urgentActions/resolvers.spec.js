import { UrgentActionsResolver } from './resolvers';
import { getUrgentAction, getUrgentActions } from './repository';

const resolvers = require('./resolvers');

jest.mock('./repository');

describe('Urgent Actions Resolvers', () => {
    describe('Queries', () => {
        describe('UrgentAction', () => {
            it('should query urgent actions with corresponding id', async () => {
                const params = { id: '16fe5e43-df12-4104-b1fe-77f8b3653802' };
                await UrgentActionsResolver.Query.UrgentAction(null, params);

                expect(getUrgentAction).toHaveBeenCalledWith('16fe5e43-df12-4104-b1fe-77f8b3653802');
            });
        });

        describe('UrgentActions', () => {
            it('should query all available urgent actions', async () => {
                await UrgentActionsResolver.Query.allUrgentActions(null, {
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
                expect(getUrgentActions).toHaveBeenCalledWith({
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
            });
        });
    });
});
