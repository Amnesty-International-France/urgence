exports.up = function(db, cb) {
    const sql = `
      CREATE TABLE activist (
        id serial,
        created_on timestamp with time zone DEFAULT NOW(),
        updated_on timestamp with time zone DEFAULT NOW(),
        firstname VARCHAR NOT NULL,
        lastname VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        phone VARCHAR NOT NULL,
        PRIMARY KEY (id)
      );
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      DROP TABLE activist;
  `;

    db.runSql(sql, cb);
};
