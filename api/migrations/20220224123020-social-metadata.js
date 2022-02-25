'use strict';

exports.up = function(db, cb) {
    const sql = `
        ALTER TABLE urgent_action ADD COLUMN social_metadata JSON;
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
        ALTER TABLE urgent_action DROP COLUMN social_metadata;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
