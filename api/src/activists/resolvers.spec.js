import ActivistsResolver from './resolvers';
import {
    getActivist,
    getActivists,
    countActivists,
    createActivist,
    removeActivist,
} from './repository';

jest.mock('./repository');

describe('Activist Resolvers', () => {
    describe('Queries', () => {
        describe('Activist', () => {
            it('should query activists with corresponding id', async () => {
                const params = { id: 10 };
                await ActivistsResolver.Query.Activist(null, params);

                expect(getActivist).toHaveBeenCalledWith(10);
            });
        });

        describe('allActivists', () => {
            it('should query all available activists', async () => {
                await ActivistsResolver.Query.allActivists(null, {
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
                expect(getActivists).toHaveBeenCalledWith({
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
            });
        });

        describe('_allActivistsMeta', () => {
            it('should query all available activists', async () => {
                await ActivistsResolver.Query._allActivistsMeta();
                expect(countActivists).toHaveBeenCalled();
            });
        });

        describe('createActivist', () => {
            it('should create an activist', async () => {
                await ActivistsResolver.Mutation.createActivist(null, {
                    civility: 'M.',
                    firstname: 'Abel',
                    lastname: 'Chemoul',
                    email: 'abel.chemoul@lesinconnus.fr',
                    phone: '0836656565',
                });

                expect(createActivist).toHaveBeenCalledWith({
                    civility: 'M.',
                    firstname: 'Abel',
                    lastname: 'Chemoul',
                    email: 'abel.chemoul@lesinconnus.fr',
                    phone: '0836656565',
                });
            });
        });

        describe('deleteActivist', () => {
            it('should remove activists with given id', async () => {
                await ActivistsResolver.Mutation.deleteActivist(null, 42);
                expect(removeActivist).toHaveBeenCalledWith(42);
            });
        });
    });
});
