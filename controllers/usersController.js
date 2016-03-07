var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js')


// router.get("/", function(req, res) {
//   res.render("index.ejs");
// })

router.get('/json', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  })
})

router.get('/users', function(req, res) {

})

// =============
// PROJECTS PAGE
// =============

// PROJECTS ROUTE
router.get('/projects', function(req, res) {
  Project.find({}, function(err, projects) {
    res.send(projects);
  })
})

// POST PROJECT ROUTE
router.post('/postproject', function(req, res) {
  console.log('REQ.BODY:', req.body);
  Project.create(req.body, function(err, project) {
    res.send(project);
  })
});

router.delete('/project/:id', function(req, res) {
  console.log('PROJECT ID: ', req.params.id);
  Project.findByIdAndRemove(req.params.id, function() {
    res.send('deleted');
  })
})

router.post("/posttest", function(req, res) {
  console.log(req.body)
    res.send(req.body);
});

// SIGNUP-- create a new account
router.post("/signup", passport.authenticate("local-signup"), function(req, res) {
  res.send(req.body);
  // res.send(req.user); // send the user object back to angular
}); // end signup route

// LOGOUT-- logout of account
router.get("/logout", function(req, res) {
  req.logout(); // built in function that will logout user
  res.send("loggedout");
}); // end logout route

// // LOGIN-- access an existing account
// router.post("/login", passport.authenticate("local-login", {
//   failureRedirect: "/users/failed"}), function(req, res) {
//   res.send("success!");
// }); // end login route

// LOGIN-- access an existing account
router.post("/login", passport.authenticate("local-login"), function(req, res) {
  res.send(req.user); // send the user object back to angular
  // res.send("success!");
}); // end login route




// EXPORT
module.exports = router;
