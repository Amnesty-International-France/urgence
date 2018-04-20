const resolvers = require('./resolvers');
const repository = require('./repository');

jest.mock('./repository');

describe('Urgent Actions Resolvers', () => {
    describe('Queries', () => {
        describe('UrgentAction', () => {
            it('should query urgent actions with corresponding id', async () => {
                const params = { id: '16fe5e43-df12-4104-b1fe-77f8b3653802' };
                await resolvers.Query.UrgentAction(null, params);

                expect(repository.getUrgentAction).toHaveBeenCalledWith('16fe5e43-df12-4104-b1fe-77f8b3653802');
            });
        });

        describe('UrgentActions', () => {
            it('should query all available urgent actions', async () => {
                await resolvers.Query.allUrgentActions(null, { perPage: 10, page: 0 });
                expect(repository.getUrgentActions).toHaveBeenCalledWith({
                    page: 0,
                    perPage: 10,
                    sortField: undefined,
                    sortOrder: undefined,
                });
            });
        });
    });
});
