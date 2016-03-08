var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js');

// router.get('/json', function(req, res) {
//   User.find({}, function(err, users) {
//     res.json(users);
//   })
// })

// AUTHENTICATION ROUTES

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


// LOGIN-- access an existing account
router.post("/login", passport.authenticate("local-login"), function(req, res) {
  res.send(req.user); // send the user object back to angular
  // res.send("success!");
}); // end login route




// ACTIVITY LOG ROUTES

// GET-- send all info related to the logged in user to angular
router.get("/getuserlog", function(req, res) {

  // find the logged in user
  User.findById(req.user, function(err, user) {
    // console.log(user); // confirms user object

    // send the user back to angular
    res.send(user);
  });
});


// UPDATE-- updates the user log
router.put("/userlog/", function(req, res) {
  // // console.log(req.user);
  // console.log(req.body);

  // save the incoming message value to logMessage variable
  var logMessage = req.body.message;

  // find the logged in user
  User.findById(req.user._id, function(err, user) {

    // push the message into the user's activity array
    user.activity.push({message: logMessage});

    // save the change
    user.save(function(err, updatedUser) {

      // console.log("updated user: ", updatedUser);

      // send the updated user back to angular
      res.send(updatedUser);
    });
  });
});




// EXPORT
module.exports = router;
