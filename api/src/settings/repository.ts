import client from '../db/knex';
import { Pagination } from '../types';

export type Setting = {
    id?: number;
    created_on: string;
    updated_on: string;
    type: string;
    content: string;
};

const table = 'settings';
export const getSetting = async (id: number) =>
    client.select('*').from<Setting>(table).where({ id }).first();

export const getSettingByType = async (type: string) =>
    client.select('*').from<Setting>(table).where({ type });

export const getSettings = async ({ perPage, page, sortField, sortOrder }: Pagination) =>
    client
        .select('*')
        .from<Setting>(table)
        .paginate({ perPage, currentPage: page * perPage, sortField, sortOrder });

export const countSettings = async () => client.count('*').from<Setting>(table).first();

export const createSetting = async (setting: Pick<Setting, 'content' | 'type'>) =>
    client<Setting>(table).insert(setting).returning('*').first();

export const updateSetting = async (id: number, setting: Partial<Setting>) =>
    client<Setting>(table).update(setting).where({ id }).returning('*').first();

export const removeSetting = async (id: number) => client<Setting>(table).where({ id }).del();
