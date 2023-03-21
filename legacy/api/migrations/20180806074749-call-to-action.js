'use strict';

exports.up = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action
        ALTER COLUMN call_to_action TYPE JSON
          USING CONCAT(
            '{"title":"Génial !", "message":"',
            REPLACE(call_to_action, '"', '\\"'),
            '"}'
          )::JSON;
    `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action ALTER COLUMN call_to_action TYPE TEXT USING call_to_action->>'message';
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
