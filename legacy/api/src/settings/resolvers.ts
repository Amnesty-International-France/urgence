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
        Setting: (_: null, { id }: { id: number }) => getSetting(id),
        SettingByType: (_: null, { type }: { type: string }) => getSettingByType(type),
        allSettings: (_: null, { perPage, page, sortField, sortOrder }: Pagination) => {
            if (!sortField) {
                sortField = 'id';
            }
            return getSettings({ perPage, page, sortField, sortOrder });
        },
        _allSettingsMeta: () => countSettings(),
    },
    Mutation: {
        createSetting: async (
            _: null,
            setting: Pick<Setting, 'type' | 'content'>,
            context?: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return createSetting(setting);
        },
        updateSetting: async (
            _: null,
            { id, ...setting }: Pick<Setting, 'id' | 'type' | 'content'>,
            context?: Context<{ user: AuthenticatedUser }>,
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
            _: null,
            { id }: { id: number },
            context?: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return removeSetting(id);
        },
    },
};
