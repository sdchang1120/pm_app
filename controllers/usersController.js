var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");


// router.get("/", function(req, res) {
//   res.render("index.ejs");
// })

router.get('/json', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
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