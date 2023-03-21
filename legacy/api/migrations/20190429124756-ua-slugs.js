'use strict';

exports.up = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action
        ADD COLUMN slug VARCHAR DEFAULT NULL;
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action
        DROP COLUMN slug;
  `;

    db.runSql(sql, cb);
};
