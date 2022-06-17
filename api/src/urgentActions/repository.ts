import { Color } from 'sharp';
import { Upload } from 'graphql-upload';

import knex from '../db/client';
import { Crop } from '../services/uploadImage';

const table = 'urgent_action';
const client = knex(table);

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
        src: string;
    };
};

type Medium = {
    title: string;
    src: Upload;
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
    src: Upload;
    crop?: CropDesktop;
};

type DisplayOptions = {
    mediumPosition: Position;
    backgroundColor: Color;
    color?: Color;
};

type Share = { message: string; twitter_message: string };

type Telegram = { url: string; message: string };

type StoryStep = {
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

export type UrgentAction = UrgentActionDb & {
    // TODO
    id?: string;
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
