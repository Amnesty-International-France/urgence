'use strict';

exports.up = function(db, cb) {
    const sql = `
        ALTER TABLE urgent_action ADD COLUMN is_default BOOLEAN;
    `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
        ALTER TABLE urgent_action DROP COLUMN is_default;
    `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
