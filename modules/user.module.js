var userModel = require("../models/user.model");
var userModule = {
  getUser: function(body, callback) {
    userModel
      .getUser(body)
      .then(function(results) {
        if (results.rows.length > 0)
          callback({ success: 1, data: results.rows });
        else callback({ success: 1, data: [] });
      })
      .catch(function(err) {
        console.log(err);
        callback({ success: 0, message: "unable to fetch users data" });
      });
  },
  addUser: function(body, callback) {
    getUser = userModel.getUser(body).then(function(value) {
      if (value && value.rows.length == 0) {
        userModel
          .addUser(body)
          .then(function(value) {
            if (value) {
              callback({ success: 1, message: "User add successfully" });
            } else {
              callback({ success: 0, message: "Fail to add user details" });
            }
          })
          .catch(function(err) {
            console.log(err);
            callback({ success: 0, message: "Fail to add user details" });
          });
      } else {
        callback({
          success: 0,
          message: "already register with this email id"
        });
      }
    });
  }
};

module.exports = userModule;
