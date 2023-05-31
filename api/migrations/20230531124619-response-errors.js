'use strict';

exports.up = function (db, cb) {
    const sql = `
      ALTER TABLE urgent_action ADD COLUMN response_errors INT DEFAULT 0;
`;

    db.runSql(sql, cb);
};

exports.down = function (db, cb) {
    const sql = `
      ALTER TABLE urgent_action DROP COLUMN response_errors;
`;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
