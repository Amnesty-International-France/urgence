import { Context } from 'apollo-server-core';
import { Pagination } from '../types';
import { AuthenticatedUser } from '../users/resolvers';
import {
    getSetting,
    getSettingByType,
    getSettings,
    countSettings,
    createSetting,
    updateSetting,
    removeSetting,
    Setting,
} from './repository';

export default {
    Query: {
        Setting: (_: never, { id }: { id: string }) => getSetting(id),
        SettingByType: (_: never, { type }: { type: string }) => getSettingByType(type),
        allSettings: (_: never, { perPage, page, sortField, sortOrder }: Pagination) =>
            getSettings({ perPage, page, sortField, sortOrder }),
        _allSettingsMeta: () => countSettings(),
    },
    Mutation: {
        createSetting: async (
            _: never,
            setting: Setting,
            context: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return createSetting(setting);
        },
        updateSetting: async (
            _: never,
            { id, ...setting }: Setting,
            context: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }
            if (!id) {
                throw new Error('Missing id');
            }
            return updateSetting(id, setting);
        },
        deleteSetting: async (
            _: never,
            id: string,
            context: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return removeSetting(id);
        },
    },
};
