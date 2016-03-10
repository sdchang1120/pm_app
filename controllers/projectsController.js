// ====================
//     REQUIREMENTS
// ====================

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js');
var Task = require('../models/tasks.js');


// ====================
//   PROJECTS ROUTES
// ====================

// POST / CREATE

router.post("/new", function(req, res) {

  // console.log(req.body);
  // console.log(req.user._id);

  Project.create(req.body, function(err, project) {

    User.findByIdAndUpdate(req.user._id, {$push: {projects: project}}, {new: true}, function(err, user) {

      // console.log(user);

      res.send(user);
    })
  })
});

// GET / SHOW

router.get("/get", function(req, res) {
  // console.log('TEST GET REQ.USER', req.user);
  // console.log('TEST GET REQ.USER.ID', req.user._id);

  User.findById(req.user._id, function(err, user) {
    // console.log(user.projects);

    res.send(user.projects);
  })
})

// PUT / UPDATE

router.put("/project/:pid", function(req, res) {
  // console.log('project put req.body, ', req.body);
  // console.log('PROJECT PUT REQ.BODY.NAME: ', req.body.name);

  Project.findByIdAndUpdate(req.params.pid, req.body, function(err, project) {

    User.update({_id: req.user._id, "projects._id": req.params.pid}, {$set: {"projects.$.name": req.body.name}}, function(err, user) {
      // console.log('PROJECT PUT USER: ', user);

      res.send(user);
    })
  })
});

// DELETE

router.delete("/project/:pid", function(req, res) {
  // console.log('PROJECT DELETE REQ.BODY');

  Project.findByIdAndRemove(req.params.pid, function(err, data) {

    User.update({_id: req.user._id}, {$pull: {"projects": {_id: req.params.pid}}}, function(err, data) {
      res.send("deleted");

    })

  })

});


// ====================
//     TASKS ROUTES
// ====================

// POST / CREATE

router.post("/tasks/:pid", function(req, res) {

  // console.log(req.body);

  // create new task
  Task.create(req.body, function(err, task) {

    // push task to tasks in project model
    Project.findById(req.params.pid, function(err, project) {
      project.tasks.push(task);
      project.save(function(err, data) {
        // console.log("task saved");

        // update the project in user's task array
        User.update({_id: req.user._id, "projects._id": req.params.pid}, {$push: {"projects.$.tasks": task}}, function(err, data) {
          console.log("user update data: ", data);
          res.send("created task");

        })
      })
    })
  })
})

// GET / SHOW

router.get("/tasks/:pid", function(req, res) {
  // console.log("get params, ", req.params.pid)
  Project.findById(req.params.pid, function(err, project) {
    console.log("project: ", project)
    // console.log(project);
    res.send(project);
  })
})



// UPDATE

router.put("/tasks/:pid/:tid", function(req, res) {
  // console.log("PROJECT ID: ", req.params.pid);
  // console.log("TASK ID: ", req.params.tid);
  // console.log(req.body);

  var pid = req.params.pid;
  var tid = req.params.tid;
  var task_data = req.body;

  // update task in task model
  Task.findByIdAndUpdate(req.params.tid, req.body, function(err, task) {
    // console.log(task);

    // update task in project model
    Project.update({_id: req.params.pid, "tasks._id": req.params.tid}, {$set: {"tasks.$": req.body}}, {new: true}, function(err, data) {

      // grab project
      Project.findById(req.params.pid, function(err, project) {
        // console.log("PROJECT?: ", project);

        var updatedUser = project;

        // User.findByIdAndUpdate(req.user._id, updatedUser, function(err, user) {

        // })
        User.update({_id: req.user._id, 'projects._id': updatedUser._id}, {$set: {'projects.$': updatedUser}}, {new: true}, function(err, user) {
          res.send(user);
        })

      })

    });

  });

});

// DELETE

router.delete("/tasks/:pid/:tid", function(req, res) {
  // console.log("project id, ", req.params.pid);
  // console.log("task id, ", req.params.tid);

  // delete task
  Task.findByIdAndRemove(req.params.tid, function(err, data) {

    // pull the task from the projects model
    Project.update({_id: req.params.pid}, {$pull: {"tasks": {_id: req.params.tid}}}, function(err, data) {


      // update the project in the users model
      User.update({_id: req.user._id, "projects._id": req.params.pid}, {$pull: {"projects.$.tasks": {_id: req.params.tid}}}, function(err, data) {

        res.send("deleted")
      })
    })
  })
})

module.exports = router; // export router

// ====================
//      SCRAP CODE
// ====================

// console.log('PROJECTASDFJKL;', project)


// update project in user model
// User.update({_id: req.user._id, "projects._id": req.params.pid, "projects.tasks._id": req.params.tid}, {$set: {"projects.tasks.$.name": req.body.name}}, function(err, user) {

// User.update({_id: req.user._id, "projects._id": req.params.pid, "projects.tasks._id": req.params.tid}, {$set: {"projects.tasks.$.name": req.body.name}}, function(err, user) {
//   console.log("USER ID: ", req.user._id);
//   console.log("PROJECT ID: ", req.params.pid);
//   console.log("TASK ID: ", req.params.tid);
//   console.log(err)
//   res.send(user);

// });
