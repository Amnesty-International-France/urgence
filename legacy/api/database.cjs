const config = require('../config/index.cjs');

module.exports = {
    api: {
        driver: 'pg',
        ...config.db,
    },
};
