import { knex } from 'knex';
import { attachPaginate } from 'knex-paginate';
import config from '../../../config/index.cjs';

const client = knex({
    client: 'pg',
    connection: {
        ...config.db,
    },
    pool: { min: 0, max: 7 },
});

attachPaginate();

export const parseJsonFromRow = <T>(
    row: { [property in keyof T]: any } | undefined,
): T | undefined => {
    if (row == null) {
        return undefined;
    }
    return (Object.keys(row) as Array<keyof T>).reduce((acc, key: keyof T) => {
        try {
            acc[key] = JSON.parse(row[key]);
        } catch (e) {
            // @ts-ignore
            acc[key] = row[key];
        }
        return acc;
    }, {} as T);
};

export const parseJsonFromRows = <T>(
    rows: { [property in keyof T]: any }[] | undefined,
): T[] | undefined => {
    if (rows == null) {
        return undefined;
    }
    return rows.map((row) => parseJsonFromRow(row)).filter((row) => row != null) as T[];
};

export default client;
