'use strict';

const config = require('../../config/index.cjs');

exports.up = function (db, cb) {
    return db.runSql(
        `
    UPDATE urgent_action SET story=(REPLACE(story::TEXT, 'src":"', 'src":"${config.uploadUrl}/'))::JSON
    `,
        cb,
    );
};

exports.down = function (db) {
    return db.runSql(
        `
  UPDATE urgent_action SET story=(REPLACE(story::TEXT, 'src":"${config.uploadUrl}/', 'src":"'))::JSON
  `,
        cb,
    );
};

exports._meta = {
    version: 1,
};
