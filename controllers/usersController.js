var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");

// TASK STUFF
var Task = require("../models/tasks.js");

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




// TASKS ROUTES--- NEEDS TO BE MOVED TO PROJECTS CONTROLLER
// this first get route should probably be off of the projects id
router.get("/gettasks", function(req, res) {
  // this find needs to be specific to the project id
  Task.find({}, function(err, taskData) {
    // console.log(taskData);
    res.json(taskData);
  })
});


// CREATE
router.post("/newtask", function(req, res) {
  // console.log(req.user); // confirms that req.user is accessible
  console.log(req.body); // confirms that object makes it to server

  // save new task in task collection, using task model
  var newTask = new Task(req.body);

  newTask.save(function(err, taskData) {
    console.log(taskData);

    // push new task to project task array


    // push new task to user task array using req.user

    res.send(taskData);

  });
});


// UPDATE
router.put("/updatetask/:task_id", function(req, res) {
  // console.log("UPDATE TASK");
  // console.log(req.body);
  // res.send("update");

  Task.findByIdAndUpdate(req.params.task_id, req.body, {new: true}, 

    // update the task
    function(err, taskData) {
      console.log(taskData);

    // update the task in the projects

    // update the task in the users

    res.send("updated")

  })


})


// DELETE
router.delete("/deletetask/:task_id", function(req, res) {
  
  Task.findByIdAndRemove(req.params.task_id, function(err, data) {
    res.send("deleted");
  });

});







// EXPORT
module.exports = router;