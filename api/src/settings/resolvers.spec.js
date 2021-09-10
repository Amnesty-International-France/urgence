import settingsResolver from './resolvers';
import {
    getSetting,
    getSettingByType,
    getSettings,
    countSettings,
    createSetting,
    removeSetting,
} from './repository';

jest.mock('./repository');

describe('Setting Resolvers', () => {
    describe('Queries', () => {
        describe('Setting', () => {
            it('should query settings with corresponding id', async () => {
                const params = { id: 10 };
                await settingsResolver.Query.Setting(null, params);

                expect(getSetting).toHaveBeenCalledWith(10);
            });
        });

        describe('SettingByType', () => {
            it('should query settings with corresponding type', async () => {
                const params = { type: 'i-am-lord-voldemort' };
                await settingsResolver.Query.SettingByType(null, params);

                expect(getSettingByType).toHaveBeenCalledWith('i-am-lord-voldemort');
            });
        });

        describe('allSettings', () => {
            it('should query all available settings', async () => {
                await settingsResolver.Query.allSettings(null, {
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
                expect(getSettings).toHaveBeenCalledWith({
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
            });
        });

        describe('_allSettingsMeta', () => {
            it('should query all available settings', async () => {
                await settingsResolver.Query._allSettingsMeta();
                expect(countSettings).toHaveBeenCalled();
            });
        });
    });
    describe('Mutations', () => {
        describe('createSetting', () => {
            it('should not create a setting if user is not authenticated', async () => {
                const result = await settingsResolver.Mutation.createSetting(null, {
                    type: 'rgpd',
                    content: 'Everything I do is legal.',
                });

                expect(result).toBe(null);
            });

            it('should not create a setting if user is not an admin', async () => {
                const result = await settingsResolver.Mutation.createSetting(
                    null,
                    {
                        type: 'rgpd',
                        content: 'Everything I do is legal.',
                    },
                    {
                        user: {
                            login: 'adrien',
                            roles: ['illegal'],
                        },
                    },
                );

                expect(result).toBe(null);
            });

            it('should create a setting', async () => {
                await settingsResolver.Mutation.createSetting(
                    null,
                    {
                        type: 'rgpd',
                        content: 'Everything I do is legal.',
                    },
                    {
                        user: {
                            login: 'julien',
                            roles: ['admin'],
                        },
                    },
                );

                expect(createSetting).toHaveBeenCalledWith({
                    type: 'rgpd',
                    content: 'Everything I do is legal.',
                });
            });
        });

        describe('updateSetting', () => {
            it('should not update a setting if user is not authenticated', async () => {
                const result = await settingsResolver.Mutation.updateSetting(null, {
                    id: 134,
                    type: 'rgpd',
                    content: 'Everything I do is legal.',
                });

                expect(result).toBe(null);
            });

            it('should not update a setting if user is not an admin', async () => {
                const result = await settingsResolver.Mutation.updateSetting(
                    null,
                    {
                        id: 134,
                        type: 'rgpd',
                        content: 'Everything I do is legal.',
                    },
                    {
                        user: {
                            login: 'adrien',
                            roles: ['illegal'],
                        },
                    },
                );

                expect(result).toBe(null);
            });

            it('should update a setting', async () => {
                await settingsResolver.Mutation.updateSetting(
                    null,
                    {
                        id: 134,
                        type: 'rgpd',
                        content: 'Everything I do is legal.',
                    },
                    {
                        user: {
                            login: 'julien',
                            roles: ['admin'],
                        },
                    },
                );

                expect(updateSetting).toHaveBeenCalledWith(134, {
                    type: 'rgpd',
                    content: 'Everything I do is legal.',
                });
            });
        });

        describe('deleteSetting', () => {
            it('should not remove a setting if user is not authenticated', async () => {
                const result = await settingsResolver.Mutation.deleteSetting(null, 42);

                expect(result).toBe(null);
            });

            it('should not remove a setting if user is not an admin', async () => {
                const result = await settingsResolver.Mutation.deleteSetting(null, 42, {
                    user: {
                        login: 'adrien',
                        roles: ['illegal'],
                    },
                });

                expect(result).toBe(null);
            });

            it('should remove setting with given id', async () => {
                await settingsResolver.Mutation.deleteSetting(null, 42, {
                    user: {
                        login: 'julien',
                        roles: ['admin'],
                    },
                });

                expect(removeSetting).toHaveBeenCalledWith(42);
            });
        });
    });
});
