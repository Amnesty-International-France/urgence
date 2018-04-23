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
      ALTER TABLE urgent_action ADD COLUMN story JSON;
      ALTER TABLE urgent_action ADD COLUMN creation_date timestamp DEFAULT CURRENT_TIMESTAMP;
      ALTER TABLE urgent_action ADD COLUMN last_edition_date timestamp DEFAULT CURRENT_TIMESTAMP;
  `;

  db.runSql(sql, cb);
};

exports.down = function(db, cb) {
  const sql = `
      ALTER TABLE urgent_action DROP COLUMN story;
      ALTER TABLE urgent_action DROP COLUMN creation_date;
      ALTER TABLE urgent_action DROP COLUMN last_edition_date;
  `;

  db.runSql(sql, cb);
};

exports._meta = {
  "version": 1
};
