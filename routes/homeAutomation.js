let failJson = { success: 0, message: "There was an error!" };
var userModule = require("../modules/user.module");
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
  }
};
