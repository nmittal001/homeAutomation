var db = require("../lib/db.js");
var constants = require("../config/constants");

var userModel = {
  getUser: function(body) {
    let qry;
    if (body.hasOwnProperty("user_id")) {
      qry = ` WHERE user_id = ${body.user_id} `;
    } else {
      qry = ` WHERE email = '${body.email}' `;
    }
    if (body.hasOwnProperty("password")) {
      qry += ` AND password = '${body.password}'`;
    }
    qry += ` AND status = 1 ALLOW FILTERING`;
    var query = "SELECT * FROM " + constants.TABLES.USER_DETAILS + qry;
    return db.queryPromise(query, [], { prepare: true });
  },
  addUser: function(body) {
    var query =
      "INSERT INTO " +
      constants.TABLES.USER_DETAILS +
      " (user_id, email, gender, image, user_name, created_at, status, updated_at, mobile_no, password) VALUES ( now(),?,?,?,?, dateof(now()), 1, dateof(now()) ,?, ? )";
    return db.queryPromise(
      query,
      [
        body.email,
        body.gender,
        body.image,
        body.user_name,
        body.mobile_no,
        body.password
      ],
      { prepare: true }
    );
  }
};
module.exports = userModel;
