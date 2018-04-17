const getClient = require('./client');

module.exports = async (req, res, next) => {
    let client;

    try {
        client = await getClient();
        req.dbClient = client;
        next();
    } catch (err) {
        client.end();
        return next(err);
    }

    client.release();
};
