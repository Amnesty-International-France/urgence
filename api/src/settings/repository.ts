import knex from '../db/client';
import { Pagination } from '../types';

export type Setting = {
    id?: number;
    created_on: string;
    updated_on: string;
    type: string;
    content: string;
};

const table = 'settings';
const client = knex<Setting>(table);

export const getSetting = async (id: number) => client.select('*').where({ id }).first();

export const getSettingByType = async (type: string) => client.select('*').where({ type });

export const getSettings = async ({ perPage, page, sortField, sortOrder }: Pagination) =>
    client.select('*').paginate({ perPage, currentPage: page * perPage, sortField, sortOrder });

export const countSettings = async () => client.count('*').first();

export const createSetting = async (setting: Pick<Setting, 'content' | 'type'>) =>
    client.insert(setting).returning('*').first();

export const updateSetting = async (id: number, setting: Partial<Setting>) =>
    client.update(setting).where({ id }).returning('*').first();

export const removeSetting = async (id: number) => client.where({ id }).del();
