const batchInsert = require('co-postgres-queries/queries/batchInsert');

const config = require('../../../config');
const client = require('../db/client');
import colors from '../../../front/src/themes/colors';

if (config.env === 'production') {
    throw new Error('Populating database in production is forbidden!');
}

const urgentActions = [
    {
        title: "Vietnam: le parquet insiste pour que soit executé un prisonnier condamné à mort depuis 10 ans",
        story: JSON.stringify([{
            content: 'Ho Duy Hai a été condamné à mort en 2008 après avoir été déclaré coupable de pillage de biens et de meurtre.',
            displayOptions: {
                mediumPosition: 'top',
                backgroundColor: colors.yellow,
                color: colors.black,
            }
        }, {
            content: "En 2015, la Commission des Affaires judiciaires de l'Assemblée nationale a demandé le réexamen de son cas après avoir découvert de graves erreurs de procédure.",
            displayOptions: {
                mediumPosition: 'bottom',
                backgroundColor: colors.pink,
                color: colors.black,
            }
        }, {
            content: "Le 7 décembre, le responsable du parquet de Long An a insisté, lors d'un discours à la télévision, pour que son exécution soit accélérée.",
            displayOptions: {
                mediumPosition: 'top',
                backgroundColor: colors.orange,
                color: colors.black,
            }
        }]),
        call_to_action: "<p>Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.</p>",
        message_template: JSON.stringify([
            {
                value: `Dear Minister,\nI am appalled to hear about the detention of the second Amnesty International Turkey leader within the space of a month.`,
            },
            {
                value: `On 5 July, police arrested Idil Eser along with seven other human rights defenders and two trainers, who were simply attending a workshop in Istanbul.`,
            },
            {
                value: `They were doing nothing wrong. They are being investigated on suspicion of "membership of an armed terrorist organization", a baseless and ridiculous accusation.`,
            },
        ]),
        recipient: {
            mail: 'governor@gmail.com',
            copies_to: 'ambassador@gmail.com',
            cci: 'amnesty@gmail.com',
        }
    },
];

const columns = ['title', 'story', 'call_to_action', 'message_template'];
const batchInsertQuery = batchInsert.default({
    table: 'urgent_action',
    writableCols: columns,
    returnCols: columns,
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
