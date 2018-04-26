'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, cb) {
  const sql = `
      ALTER TABLE urgent_action ADD COLUMN call_to_action TEXT;
      ALTER TABLE urgent_action ADD COLUMN message_template JSON;
  `;

  db.runSql(sql, cb);
};

exports.down = function(db, cb) {
  const sql = `
      ALTER TABLE urgent_action DROP COLUMN call_to_action;
      ALTER TABLE urgent_action DROP COLUMN message_template;
  `;

  db.runSql(sql, cb);
};

exports._meta = {
  "version": 1
};
