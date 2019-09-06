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
                await settingsResolver.Query.Setting(null, params);

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

        describe('createSetting', () => {
            it('should create an setting', async () => {
                await settingsResolver.Mutation.createSetting(null, {
                    type: 'rgpd',
                    content: 'Everything I do is legal.',
                });

                expect(createSetting).toHaveBeenCalledWith({
                    type: 'rgpd',
                    content: 'Everything I do is legal.',
                });
            });
        });

        describe('deleteSetting', () => {
            it('should remove settings with given id', async () => {
                await settingsResolver.Mutation.deleteSetting(null, 42);
                expect(removeSetting).toHaveBeenCalledWith(42);
            });
        });
    });
});
