'use strict';

exports.up = function (db, cb) {
    const sql = `
      ALTER TABLE activist ADD COLUMN civility VARCHAR;
  `;

    db.runSql(sql, cb);
};

exports.down = function (db, cb) {
    const sql = `
      ALTER TABLE activist DROP COLUMN civility;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
