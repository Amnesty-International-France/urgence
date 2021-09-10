'use strict';

exports.up = function(db, cb) {
    const sql = `
        CREATE TABLE user_token (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            login text NOT NULL,
            token text NOT NULL,
            expire_date date NOT NULL
        );

        ALTER TABLE ONLY user_token
          ADD CONSTRAINT user_token_pkey PRIMARY KEY (id);
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
        DROP TABLE user_token;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
