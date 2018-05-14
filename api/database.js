const config = require('../config');
console.log(config.db);
module.exports = {
    "api": {
        driver: 'pg',
        ...config.db,
    },
};
