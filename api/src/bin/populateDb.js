const batchInsert = require('co-postgres-queries/queries/batchInsert');
const config = require('../../../config');

const client = require('../db/client');

if (config.env === 'production') {
    throw new Error('Populating database in production is forbidden!');
}

const urgentActions = [
    {
        title: "VIET-NAM : LE PARQUET INSISTE POUR QUE SOIT EXECUTE UN PRISONNIER CONDAMNE A MORT DEPUIS 10 ANS",
        story: JSON.stringify([{
            content: `Ho Duy Hai a été condamné à mort en 2008 après avoir été déclaré coupable de pillage de biens et de meurtre. En 2015, la Commission des Affaires judiciaires de l'Assemblée nationale a demandé le réexamen de son cas après avoir découvert de graves erreurs de procédure dans cette affaire. Le 7 décembre, le responsable du parquet de Long An a insisté, lors d'un discours à la télévision, pour que son exécution soit accélérée.`,
            displayOptions: {
                mediumPosition: 'top',
                backgroundColor: 'FFFF00',
            }
        }])
    },
    { title: 'Mexico: 48 Asylum Applicants Risk to Be Expulsed', story: JSON.stringify([]) },
    { title: "Commutation of William Montgomery's sentence", story: JSON.stringify([]) },
];

const batchInsertQuery = batchInsert.default({
    table: 'urgent_action',
    writableCols: ['title', 'story'],
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


