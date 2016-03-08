var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js');


router.get("/", function(req, res) {
  res.send("got here")
})

router.get("/get", function(req, res) {
  // console.log('TEST GET REQ.USER', req.user);
  // console.log("/get");
  res.send("get");
})


module.exports = router;
