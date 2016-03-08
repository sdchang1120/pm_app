var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js');


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

// =======================================
//            PROJECTS ROUTES
// =======================================

// POST PROJECT ROUTE
// router.post('/:uid', function(req, res) {
//   console.log('POST USER ID: ', req.params.uid);
//   console.log('POST REQ.BODY: ', req.body);
//   User.findByIdAndUpdate(req.params.uid, {$push: {projects: req.body}}, {new: true}, function(err) {
//   });
//   Project.create(req.body, function(err, project) {
//     res.send(project);
//   })
// });

// // SHOW USER'S PROJECTS
// router.get('/:uid', function(req, res) {
//   console.log('USER ID: ', req.params.uid);
//   // User.findById(req.params.uid, function(err, data) {
//   //   console.log('DATA: ', data);
//   //   res.send(data);
//   // });
//   Project.find({}, function(err, projects) {
//     res.send(projects);
//   })
// })

// // UPDATE PROJECT ROUTE
// router.put('/:uid/:pid', function(req, res) {
//   console.log(req.body);
//   console.log('USER ID: ', req.params.uid);
//   console.log('PROJECT ID: ', req.params.pid);
//   // User.update({_id: req.params.uid, 'projects'})
//   Project.findByIdAndUpdate(req.params.pid, req.body, function() {
//     res.send('updated');
//   })
// })

// // DELETE PROJECT ROUTE
// router.delete('/project/:id', function(req, res) {
//   console.log('PROJECT ID: ', req.params.id);
//   Project.findByIdAndRemove(req.params.id, function() {
//     res.send('deleted');
//   })
// })

// =======================================
//          END PROJECTS ROUTES
// =======================================

router.post("/posttest", function(req, res) {
  // console.log(req.body)
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


// update user log
router.put("/userlog/", function(req, res) {
  // // console.log(req.user);
  // console.log(req.body)
  // res.send("done")
  var logMessage = req.body.message;

  User.findById(req.user._id, function(err, user) {
    // push the message into the user's activity array
    user.activity.push({message: logMessage});
    user.save(function(err, data) {

      res.send(user);
    })
  })

})




// EXPORT
module.exports = router;
