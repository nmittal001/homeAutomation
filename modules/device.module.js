var userModel = require("../models/user.model");
var deviceModel = require("../models/device.model");
var userModule = require("./user.module");

var deviceModule = {
  getDevices: function(user_id, callback) {
    deviceModel.getDevices(user_id).then(function(result) {
      if (result.rows.length > 0) {
        callback({ success: 1, data: result.rows });
      } else {
        callback({ success: 1, data: [] });
      }
    });
  },
  addDevice: function(body, callback) {
    userModule.userInfo(body.user_id).then(function(userInfo) {
      body.user_info = userInfo;
      deviceModel
        .addDevice(body)
        .then(function(value) {
          if (value) {
            callback({ success: 1, message: "Device add successfully" });
          } else {
            callback({ success: 0, message: "Fail to add Device details" });
          }
        })
        .catch(function(err) {
          console.log(err);
          callback({ success: 1, message: "Fail to add Device details" });
        });
    });
  },
  deviceSwitch: function(body, callback) {
    deviceModel.getDeviceById(body).then(function(deviceInfoById) {
      if (deviceInfoById.rows.length === 1) {
        deviceModel.deviceSwitch(body).then(function(result) {
          if (result) {
            callback({
              success: 1,
              message: "Updated successfully"
            });
          } else {
            callback({
              success: 1,
              message: "Now your device switch status is not updated"
            });
          }
        });
      } else {
        callback({ success: 1, message: "Please check the device details" });
      }
    });
  },
  deleteDevice: function(body, callback) {
    deviceModel.getDeviceById(body).then(function(deviceInfoById) {
      if (deviceInfoById.rows.length === 1) {
        deviceModel.deleteDevice(body).then(function(result) {
          if (result) {
            callback({
              success: 1,
              message: "Device deleted successfully"
            });
          } else {
            callback({
              success: 1,
              message: "Device is not deleted"
            });
          }
        });
      } else {
        callback({ success: 1, message: "Please check the device details" });
      }
    });
  }
};
module.exports = deviceModule;
