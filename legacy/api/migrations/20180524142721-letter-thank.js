'use strict';

exports.up = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action ADD COLUMN letter_thank JSON DEFAULT '{}';
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action DROP COLUMN letter_thank;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
