import { Color } from 'sharp';
import { Upload } from 'graphql-upload';

import knex from '../db/client';
import { Crop } from '../services/uploadImage';
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
const client = knex<UrgentActionDb>(table);

export const getUrgentActions = async ({ perPage, page, sortField, sortOrder }: Pagination) =>
    client.select('*').paginate({ perPage, currentPage: page * perPage, sortField, sortOrder });

export const countUrgentActions = async () => client.count('*').first();

export const getUrgentAction = async (id: string) => client.select('*').where({ id }).first();

export const getDefaultUrgentAction = async () =>
    client.select('*').where({ is_default: true }).first();

export const getUrgentActionBySlug = async (slug: string) =>
    client.select('*').where({ slug }).first();

export const createUrgentAction = async (urgentAction: Omit<UrgentActionDb, 'id'>) =>
    client.insert(urgentAction).returning('*').first();

export const updateUrgentAction = async (
    id: string,
    urgentAction: Partial<UrgentActionDb>,
    last_edition_date = new Date(),
) => client.update(urgentAction).where({ id }).returning('*').first();

export const removeUrgentAction = async (id: string) => client.where({ id }).delete();
