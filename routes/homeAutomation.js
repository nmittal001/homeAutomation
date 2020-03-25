const failJson = { success: 0, message: "There was an error!" };
const userModule = require("../modules/user.module");
const deviceModule = require("../modules/device.module");
module.exports = {
  configure(app) {
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
    app.post("/homeAutomation/addDevice", function(req, res) {
      try {
        req.body.user_id = req.decoded.user_id;
        deviceModule.addDevice(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.put("/homeAutomation/deviceSwitch", function(req, res) {
      try {
        req.body.user_id = req.decoded.user_id;
        deviceModule.deviceSwitch(req.body, function(result) {
          return res.json(result);
        });
      } catch (err) {
        console.log(err);
        return res.json(failJson);
      }
    });
    app.delete("/homeAutomation/deleteDevice", function(req, res) {
      try {
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
