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
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

      CREATE TABLE urgent_action (
          id uuid NOT NULL,
          title text NOT NULL
      );

      ALTER TABLE ONLY urgent_action
          ADD CONSTRAINT urgent_action_pkey PRIMARY KEY (id);
  `;

  db.runSql(sql, cb);
};

exports.down = function(db, cb) {
  const sql = `
      DROP EXTENSION "uuid-ossp";
      DROP TABLE urgent_action;
  `;

  db.runSql(sql, cb);
};

exports._meta = {
  "version": 1
};
