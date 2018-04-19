const batchInsert = require('co-postgres-queries/queries/batchInsert');
const config = require('../../../config');

const client = require('../db/client');

if (config.env === 'production') {
    throw new Error('Populating database in production is forbidden!');
}

const urgentActions = [
    { title: "José Napoleón Tarrillo Astonitas' Murder" },
    { title: 'Mexico: 48 Asylum Applicants Risk to Be Expulsed' },
    { title: "Commutation of William Montgomery's sentence" },
];

const batchInsertQuery = batchInsert.default({
    table: 'urgent_action',
    writableCols: ['title'],
    returnCols: ['title'],
})(urgentActions);

client(batchInsertQuery)
    .then(rows => {
        console.log(`Success: ${rows.length} records have been inserted`)
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


