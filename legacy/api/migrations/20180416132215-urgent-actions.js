exports.up = function(db, cb) {
  const sql = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

      CREATE TABLE urgent_action (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
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
