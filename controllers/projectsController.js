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


router.put("/project/:project_id", function(req, res) {
  console.log('project put req.body, ', req.body);
  console.log('PROJECT PUT REQ.BODY.NAME: ', req.body.name);

  Project.findByIdAndUpdate(req.params.project_id, req.body, function(err, project) {

    User.update({_id: req.user._id, "projects._id": req.params.project_id}, {$set: {"projects.$.name": req.body.name}}, function(err, user) {
      console.log('PROJECT PUT USER: ', user);

      res.send(user);
    })
  })
});


router.delete("/project/:project_id", function(req, res) {
  console.log('PROJECT DELETE REQ.BODY');

  Project.findByIdAndRemove(req.params.project_id, function(err, data) {

    User.update({_id: req.user._id}, {$pull: {"projects": {_id: req.params.project_id}}}, function(err, data) {
      res.send("deleted");

    })

  })

});







module.exports = router;