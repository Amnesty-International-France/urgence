const getClient = require('./client');

module.exports = async (req, res, next) => {
    req.dbClient = await getClient();
    next();
};
