'use strict';

exports.up = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action ADD COLUMN email_thank JSON DEFAULT '{}';
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action DROP COLUMN email_thank;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
