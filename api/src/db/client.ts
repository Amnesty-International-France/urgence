import { knex } from 'knex';
import { attachPaginate } from 'knex-paginate';
import config from '../../../config';

const client = knex({
    client: 'pg',
    connection: {
        ...config.db,
    },
    pool: { min: 0, max: 7 },
});

attachPaginate();

export default client;
