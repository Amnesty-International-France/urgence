import {
    getSetting,
    getSettings,
    countSettings,
    createSetting,
    updateSetting,
    removeSetting,
} from './repository';

export default {
    Query: {
        Setting: (_, { id }) => getSetting(id),
        allSettings: (_, { perPage, page, sortField, sortOrder }) =>
            getSettings({ perPage, page, sortField, sortOrder }),
        _allSettingsMeta: () => countSettings(),
    },
    Mutation: {
        createSetting: async (_, setting) => createSetting(setting),
        updateSetting: async (_, setting) => updateSetting(id, setting),
        deleteSetting: async (_, id) => removeSetting(id),
    },
};
