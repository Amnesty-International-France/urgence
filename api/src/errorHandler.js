const config = require('../../config');

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const message = config.env === 'production' ? 'An error occured.' : `<pre>${err.stack}</pre>`;
    return res.status(err.status || 500).send(message);
};
