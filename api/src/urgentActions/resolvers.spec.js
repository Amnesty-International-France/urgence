import { UrgentActionsResolver } from './resolvers';
import {
    getUrgentAction,
    getUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction,
} from './repository';

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

        describe('allUrgentActions', () => {
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

        describe('createUrgentAction', () => {
            it('should create given urgent action', async () => {
                await UrgentActionsResolver.Mutation.createUrgentAction(null, {
                    title: 'test',
                    story: [{
                        content: 'this is a test',
                        displayOptions: {
                            position: 'top',
                            backgroundColor: 'FFFF00',
                        },
                        medium: {
                            src: 'picture.gif',
                            title: 'a picture',
                        }
                    }]
                });
                expect(createUrgentAction).toHaveBeenCalledWith({
                    title: 'test',
                    story: '[{"content":"this is a test","displayOptions":{"position":"top","backgroundColor":"FFFF00"},"medium":{"src":"picture.gif","title":"a picture"}}]',
                });
            });
        });

        describe('updateUrgentAction', () => {
            it('should update urgent action with given id with remaining data', async () => {
                await UrgentActionsResolver.Mutation.updateUrgentAction(null, {
                    id: 'id',
                    title: 'test',
                    story: [{
                        content: 'this is a test',
                        displayOptions: {
                            position: 'top',
                            backgroundColor: 'FFFF00',
                        },
                        medium: {
                            src: 'picture.gif',
                            title: 'a picture',
                        }
                    }]
                });
                expect(updateUrgentAction).toHaveBeenCalledWith('id', {
                    title: 'test',
                    story: '[{"content":"this is a test","displayOptions":{"position":"top","backgroundColor":"FFFF00"},"medium":{"src":"picture.gif","title":"a picture"}}]',
                });
            });
        });

        describe('deleteUrgentAction', () => {
            it('should remove urgent action with given id', async () => {
                await UrgentActionsResolver.Mutation.deleteUrgentAction(null, 'id');
                expect(removeUrgentAction).toHaveBeenCalledWith('id');
            });
        });
    });
});
