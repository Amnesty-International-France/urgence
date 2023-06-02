'use strict';

exports.up = function (db, cb) {
    const sql = `
      ALTER TABLE urgent_action ADD COLUMN mailto_count INT DEFAULT 0;
      ALTER TABLE urgent_action ADD COLUMN mailto_errors INT DEFAULT 0;
`;

    db.runSql(sql, cb);
};

exports.down = function (db, cb) {
    const sql = `
      ALTER TABLE urgent_action DROP COLUMN mailto_count;
      ALTER TABLE urgent_action DROP COLUMN mailto_errors;
`;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
