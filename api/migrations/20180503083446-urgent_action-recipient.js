'use strict';

exports.up = function(db, cb) {
  const sql = `
      ALTER TABLE urgent_action ADD COLUMN recipient JSON;
  `;

  db.runSql(sql, cb);
};

exports.down = function(db, cb) {
  const sql = `
      ALTER TABLE urgent_action DROP COLUMN recipient;
  `;

  db.runSql(sql, cb);
};

exports._meta = {
  "version": 1
};
