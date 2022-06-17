const config = require('../config').default;

module.exports = {
    api: {
        driver: 'pg',
        ...config.db,
    },
};
