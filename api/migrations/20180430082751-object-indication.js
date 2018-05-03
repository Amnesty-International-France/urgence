'use strict';

exports.up = function(db, cb) {
  const sql = `
      ALTER TABLE urgent_action ADD COLUMN object_indication TEXT NOT NULL DEFAULT 'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.';
  `;

  db.runSql(sql, cb);
};

exports.down = function(db, cb) {
  const sql = `
      ALTER TABLE urgent_action DROP COLUMN object_indication TEXT;
  `;

  db.runSql(sql, cb);
};

exports._meta = {
  "version": 1
};
