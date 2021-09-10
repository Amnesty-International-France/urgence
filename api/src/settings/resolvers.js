import {
    getSetting,
    getSettingByType,
    getSettings,
    countSettings,
    createSetting,
    updateSetting,
    removeSetting,
} from './repository';

export default {
    Query: {
        Setting: (_, { id }) => getSetting(id),
        SettingByType: (_, { type }) => getSettingByType(type),
        allSettings: (_, { perPage, page, sortField, sortOrder }) =>
            getSettings({ perPage, page, sortField, sortOrder }),
        _allSettingsMeta: () => countSettings(),
    },
    Mutation: {
        createSetting: async (_, setting, context) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return createSetting(setting);
        },
        updateSetting: async (_, { id, ...setting }, context) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return updateSetting(id, setting);
        },
        deleteSetting: async (_, id, context) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return removeSetting(id);
        },
    },
};
