'use strict';

exports.up = function(db, cb) {
    const sql = `
    ALTER TABLE urgent_action ADD COLUMN message JSON DEFAULT '{
        "indication": "Parce que les messages uniques ont plus d''impact nous vous invitons à personnaliser l''objet de l''email.",
        "object_indication": "Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.",
        "message_template": "",
        "recipient": ""
    }';


      ALTER TABLE urgent_action DROP COLUMN object_indication;
      ALTER TABLE urgent_action DROP COLUMN message_template;
      ALTER TABLE urgent_action DROP COLUMN recipient;
  `;

    db.runSql(sql, cb);
};

exports.down = function(db, cb) {
    const sql = `
      ALTER TABLE urgent_action DROP COLUMN message;

      ALTER TABLE urgent_action ADD COLUMN object_indication TEXT NOT NULL DEFAULT 'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.';
      ALTER TABLE urgent_action ADD COLUMN message_template JSON;
      ALTER TABLE urgent_action ADD COLUMN recipient JSON;
  `;

    db.runSql(sql, cb);
};

exports._meta = {
    version: 1,
};
