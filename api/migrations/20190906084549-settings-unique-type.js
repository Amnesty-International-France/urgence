exports.up = function(db, cb) {
    const sql = `
      ALTER TABLE settings ADD CONSTRAINT unique_type UNIQUE (type);
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      ALTER TABLE settings DROP CONSTRAINT unique_type;
  `;

    db.runSql(sql, cb);
};
