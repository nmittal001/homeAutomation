var db = require("../lib/db.js");
var constants = require("../config/constants");
var deviceModel = {
  getDevices: function(user_id) {
    let query =
      "SELECT * FROM " +
      constants.TABLES.DEVICE +
      " WHERE status = ? AND user_id = ? ALLOW FILTERING";
    return db.queryPromise(query, [1, user_id], { prepare: true });
  },
  addDevice: function(body) {
    let query =
      "INSERT INTO " +
      constants.TABLES.DEVICE +
      " ( user_id, id, created_at, description, last_connected, mac_id, status, switch_status, user_info ) VALUES (?, now(), dateof(now()), ?, dateof(now()), ?, 1, 0, ?);";
    return db.queryPromise(
      query,
      [body.user_id, body.description, body.mac_id, body.user_info],
      { prepare: true }
    );
  },
  getDeviceById: function(body) {
    let query =
      "SELECT * FROM " +
      constants.TABLES.DEVICE +
      " WHERE status = ? AND user_id = ? AND created_at = ? AND id = ? ALLOW FILTERING";
    return db.queryPromise(query, [1, body.user_id, body.created_at, body.id], {
      prepare: true
    });
  },
  deviceSwitch: function(body) {
    let query = `UPDATE ${constants.TABLES.DEVICE} SET switch_status = ? WHERE user_id =? AND id =? AND created_at =?`;
    return db.queryPromise(
      query,
      [body.switch_status, body.user_id, body.id, body.created_at],
      {
        prepare: true
      }
    );
  },
  deleteDevice: function(body) {
    let query = `UPDATE ${constants.TABLES.DEVICE} SET status = 0 WHERE user_id =? AND id =? AND created_at =?`;
    return db.queryPromise(query, [body.user_id, body.id, body.created_at], {
      prepare: true
    });
  }
};
module.exports = deviceModel;
