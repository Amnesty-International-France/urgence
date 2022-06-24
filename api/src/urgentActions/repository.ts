import { Color } from 'sharp';
import { Upload } from 'graphql-upload';

import client, { parseJsonFromRow, parseJsonFromRows } from '../db/knex';
import { Crop, ImageUpload } from '../services/uploadImage';
import { Pagination } from '../types';

type Position = {
    x: number;
    y: number;
};
type Link = {
    label: String;
    url: String;
};

export type SocialMetadata = {
    title: string;
    description: string;
    medium: {
        src: ImageUpload;
    };
};

type Medium = {
    title: string;
    src: ImageUpload;
    crop?: Crop;
};

type CropDesktop = {
    unit: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

type MediumDesktop = {
    title: string;
    src: ImageUpload;
    crop?: CropDesktop;
};

type DisplayOptions = {
    mediumPosition?: Position;
    backgroundColor?: Color;
    color?: Color;
    position?: string;
};

type Share = { message: string; twitter_message: string };

type Telegram = { url: string; message: string };

export type StoryStep = {
    content: String;
    medium?: Medium;
    mediumDesktop?: MediumDesktop;
    displayOptions?: DisplayOptions;
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

export type UrgentAction = {
    // TODO
    id: string;
    title: string;
    slug: string;
    is_default: boolean;
    campaign_code: string;
    origin_code: string;

    call_to_action: string; // TODO Verify if this is a string or a Object
    register: string; // TODO Verify if this is a string or a Object
    end_thank: string; // TODO Verify if this is a string or a Object
    creation_date: string; // TODO Verify if this is a string or a Object
    last_edition_date?: string; // TODO Verify if this is a string or a Object
    response_count: number;

    story: StoryStep[];
    social_metadata: SocialMetadata;
    email_thank: {
        title: string;
        text: string;
        button: string;
        share: Share;
        telegram: Telegram;
    };
    message: {
        text_view: string;
        text_send: string;
        button_view: string;
        button_send: string;
        object_indication: string;
        object_example: string;
        message_template: { value: string }[]; // TODO
        recipient: {
            // TODO
            postal_address: string;
        };
    };
};

const table = 'urgent_action';

export const getUrgentActions = async ({ perPage, page, sortField, sortOrder }: Pagination) =>
    client
        .select('*')
        .from<UrgentActionDb>(table)
        .paginate({ perPage, currentPage: page * perPage, sortField, sortOrder })
        .then((row) => ({
            ...row,
            data: parseJsonFromRows<UrgentAction>(row.data),
        }))
        .then((row) => row.data);

export const countUrgentActions = async () => client.count('*').from(table).first();

export const getUrgentAction = async (id: string) =>
    client
        .select('*')
        .from<UrgentActionDb>(table)
        .where({ id })
        .first()
        .then((row) => parseJsonFromRow<UrgentAction>(row));

export const getDefaultUrgentAction = async () =>
    client
        .select('*')
        .from<UrgentActionDb>(table)
        .where({ is_default: true })
        .first()
        .then((row) => parseJsonFromRow<UrgentAction>(row));

export const getUrgentActionBySlug = async (slug: string) =>
    client
        .select('*')
        .from<UrgentActionDb>(table)
        .where({ slug })
        .first()
        .then((row) => parseJsonFromRow<UrgentAction>(row));

export const createUrgentAction = async (urgentAction: Omit<UrgentActionDb, 'id'>) =>
    client<UrgentActionDb>(table)
        .insert(urgentAction)
        .returning('*')
        .then((rows) => rows[0])
        .then((row) => parseJsonFromRow<UrgentAction>(row));

export const updateUrgentAction = async (
    id: string,
    urgentAction: Partial<UrgentActionDb>,
    last_edition_date = new Date(),
) =>
    client<UrgentActionDb>(table)
        .update(urgentAction)
        .where({ id })
        .returning('*')
        .then((rows) => rows[0])
        .then((row) => parseJsonFromRow<UrgentAction>(row));

export const removeDefaultToOther = async (id: string) => {
    client<UrgentActionDb>(table)
        .update({ is_default: false })
        .where('is_default', '=', true)
        .and.where('id', '<>', id);
};

export const removeUrgentAction = async (id: string) =>
    client<UrgentActionDb>(table).where({ id }).delete();
