import knex from '../db/client';

const table = 'urgent_action';
const client = knex(table);

export type SocialMetadata = {
    title: string;
    message: string;
};

export type UrgentActionDb = {
    id: string;
    title: string;
    slug: string;
    is_default: boolean;
    campaign_code: string;
    origin_code: string;
    story: string;
    call_to_action: string;
    message: string;
    email_thank: string;
    register: string;
    end_thank: string;
    creation_date: string;
    last_edition_date?: string;
    social_metadata: string;
    response_count: number;
};

export type UrgentAction = UrgentActionDb & {
    id?: string;
    story: string[];
    social_metadata: SocialMetadata;
    message: {
        message_template: { value: string }[];
        recipient: {
            postal_address: string;
        };
    };
};

export const getUrgentActions = async ({
    perPage,
    page,
    sortField,
    sortOrder,
}: {
    perPage: number;
    page: number;
    sortField: string;
    sortOrder: 'ASC' | 'DESC';
}) =>
    client
        .select('*')
        .from(table)
        .paginate({ perPage, currentPage: page * perPage, sortField, sortOrder });

export const countUrgentActions = async () => client.count('*').first();

export const getUrgentAction = async (id: string) => client.select('*').where({ id }).first();

export const getDefaultUrgentAction = async () =>
    client.select('*').where({ is_default: true }).first();

export const getUrgentActionBySlug = async (slug: string) =>
    client.select('*').where({ slug }).first();

export const createUrgentAction = async (urgentAction: UrgentActionDb) =>
    client.insert(urgentAction).returning('*');

export const updateUrgentAction = async (
    id: string,
    urgentAction: UrgentActionDb,
    last_edition_date = new Date(),
) => client.update(urgentAction).where({ id }).returning('*');

export const removeUrgentAction = async (id: string) => client.where({ id }).delete();
