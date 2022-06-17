const getClient = require('./client');

// useful ?

module.exports = async (req, res, next) => {
    let client;

    try {
        client = await getClient();
        req.dbClient = client;
    } catch (err) {
        if (client) {
            client.end();
        }

        return next(err);
    }

    next();
    client.release();
};
