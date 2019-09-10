'use strict';

exports.up = function(db, cb) {
    const sql = `
        ALTER TABLE urgent_action ADD COLUMN origin_code VARCHAR;
    `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
        ALTER TABLE urgent_action DROP COLUMN origin_code;
    `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
