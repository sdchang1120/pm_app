var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js');


// router.get("/", function(req, res) {
//   res.send("got here")
// })

router.post("/new", function(req, res) {

  // console.log(req.body);
  console.log(req.user._id);

  Project.create(req.body, function(err, project) {

    User.findByIdAndUpdate(req.user._id, {$push: {projects: project}}, {new: true}, function(err, user) {

      console.log(user);

      res.send(user);
    })
  })
});




router.get("/get", function(req, res) {
  // console.log('TEST GET REQ.USER', req.user);
  // console.log('TEST GET REQ.USER.ID', req.user._id);

  User.findById(req.user._id, function(err, user) {
    console.log(user.projects);

    res.send(user.projects);
  })  
})





module.exports = router;