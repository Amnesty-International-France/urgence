module.exports = (req, res, next) => {
    req.dbClient.release();
    next();
};
