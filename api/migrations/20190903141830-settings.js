exports.up = function(db, cb) {
    const sql = `
      CREATE TABLE settings (
        id serial,
        created_on timestamp with time zone DEFAULT NOW(),
        updated_on timestamp with time zone DEFAULT NOW(),
        type VARCHAR NOT NULL,
        content VARCHAR NOT NULL,
        PRIMARY KEY (id)
      );
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      DROP TABLE settings;
  `;

    db.runSql(sql, cb);
};
