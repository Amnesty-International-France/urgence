exports.up = function(db, cb) {
    const sql = `
      INSERT INTO settings (type, content) VALUES ('desktop-alert', 'Cette action est optimisée pour un affichage sur smartphone');
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      DELETE FROM settings WHERE type='desktop-alert';
  `;

    db.runSql(sql, cb);
};
