var express = require("express");
var bodyparser = require("body-parser");
var jwt = require("jsonwebtoken");
var app = express();
var homeAutomation = require("./routes/homeAutomation.js");
var db = require("./lib/db.js");
var userModule = require("./modules/user.module");
var cors = require("cors");
let failJson = { success: 0, message: "There was an error!" };

app.use(cors());

app.use(bodyparser.json());
db.configure();

app.get("/homeAutomation", function(req, res) {
  return res.json({ success: 1, message: "homeAutomation API is working" });
});

app.post("/homeAutomation/register", function(req, res) {
  try {
    console.log("req.url:", req.url);
    let valid = validation(req.body);
    if (!valid[0]) {
      return res.json({ success: 0, message: valid[1] });
    }
    userModule.addUser(req.body, function(result) {
      return res.json(result);
    });
  } catch (err) {
    console.log(err);
    return res.json(failJson);
  }
});

app.post("/homeAutomation/login", function(req, res) {
  console.log("req.url:", req.url);
  let valid = validation(req.body);
  if (!valid[0]) {
    return res.json({ success: 0, message: valid[1] });
  }
  userModule.getUser(req.body, function(result) {
    let dbEmail = "";
    let dbPassword = "";
    if (result.data && result.data.length == 1) {
      dbEmail = result.data[0].email;
      dbPassword = result.data[0].password;
    }
    try {
      if (req.body.email && req.body.password) {
        if (req.body.email === dbEmail && req.body.password === dbPassword) {
          jwt.sign(
            { email: req.body.email, user_id: result.data[0].user_id },
            "HelloKey",
            {
              expiresIn: "12h" // expires in 12 hours
            },
            function(err, token) {
              if (err) {
                return res.status(401).send({
                  success: 0,
                  message: "Failed to generate authenticate token."
                });
              } else {
                res.send({
                  success: 1,
                  message: "Authentication successful!",
                  token: token
                });
              }
            }
          );
        } else {
          res.status(403).send({
            success: 0,
            message: "Incorrect username or password"
          });
        }
      } else {
        res.status(400).json({
          success: 0,
          message: "Authentication failed! Please check the request"
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});

app.use(function(req, res, next) {
  console.log("req.url:", req.url);
  var token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "HelloKey", function(err, decoded) {
      if (err) {
        return res
          .status(401)
          .send({ success: 0, message: "Failed to authenticate token." });
      } else {
        console.log("decoded", decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: 0,
      message: "token is require"
    });
  }
});

homeAutomation.configure(app);

let server = app.listen(7005, function() {
  console.log("Listening on port " + server.address().port);
});

let validation = body => {
  if (!body.hasOwnProperty("email")) {
    return [false, "email is required"];
  }
  if (!body.hasOwnProperty("password")) {
    return [false, "password is required"];
  }
  return [true, "ok"];
};
