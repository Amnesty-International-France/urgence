const config = require('../config');

module.exports = {
    "api": {
        driver: 'pg',
        ...config.db,
    },
};
