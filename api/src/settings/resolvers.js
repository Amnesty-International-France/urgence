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
        createSetting: async (_, setting) => createSetting(setting),
        updateSetting: async (_, { id, ...setting }) => updateSetting(id, setting),
        deleteSetting: async (_, id) => removeSetting(id),
    },
};
