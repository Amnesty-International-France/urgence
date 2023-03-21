'use strict';

exports.up = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action ADD COLUMN end_of_story_link JSON DEFAULT '{}';
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action DROP COLUMN end_of_story_link;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
