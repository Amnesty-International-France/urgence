'use strict';

exports.up = function (db, cb) {
    const sql = `
      ALTER TABLE urgent_action RENAME COLUMN letter_thank to end_thank;
  `;

    db.runSql(sql, cb);
};

exports.down = function (db, cb) {
    const sql = `
      ALTER TABLE urgent_action RENAME COLUMN end_thank to letter_thank;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
