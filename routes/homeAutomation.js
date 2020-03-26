const failJson = { success: 0, message: "There was an error!" };
const userModule = require("../modules/user.module");
const deviceModule = require("../modules/device.module");
module.exports = {
  configure(app) {
    /**
     * API for getting information of user
     */
    app.get("/homeAutomation/getUser", function(req, res) {
      try {
        userModule.getUser(req.decoded, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    /**
     * API for getting list of devices of the user
     */
    app.get("/homeAutomation/getDevices", function(req, res) {
      try {
        deviceModule.getDevices(req.decoded.user_id, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    /**
     * API for adding device of the user
     */
    app.post("/homeAutomation/addDevice", function(req, res) {
      try {
        if (!req.body.hasOwnProperty("mac_id")) {
          return res.json({ success: 0, message: "mac_id is required" });
        }
        req.body.user_id = req.decoded.user_id;
        deviceModule.addDevice(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    /**
     * API for ON or OFF the device
     */
    app.put("/homeAutomation/deviceSwitch", function(req, res) {
      try {
        if (!req.body.hasOwnProperty("switch_status")) {
          return res.json({ success: 0, message: "switch_status is required" });
        }
        if (!req.body.hasOwnProperty("id")) {
          return res.json({ success: 0, message: "id is required" });
        }
        if (!req.body.hasOwnProperty("created_at")) {
          return res.json({ success: 0, message: "created_at is required" });
        }
        req.body.user_id = req.decoded.user_id;
        deviceModule.deviceSwitch(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    /**
     * API for deleting the device
     */
    app.delete("/homeAutomation/deleteDevice", function(req, res) {
      try {
        if (!req.body.hasOwnProperty("id")) {
          return res.json({ success: 0, message: "id is required" });
        }
        if (!req.body.hasOwnProperty("created_at")) {
          return res.json({ success: 0, message: "created_at is required" });
        }
        req.body.user_id = req.decoded.user_id;
        deviceModule.deleteDevice(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
  }
};
