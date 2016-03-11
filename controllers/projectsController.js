// ==============================
//          REQUIREMENTS
// ==============================

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js');
var Task = require('../models/tasks.js');

// ==============================
//        PROJECT ROUTES
// ==============================

// POST / CREATE -- new project
router.post("/new", function(req, res) {
  // console.log(req.body);
  // console.log(req.user._id);

  // create a new project using incoming data and project model
  Project.create(req.body, function(err, project) {

    // save the new project to active user's projects
    User.findByIdAndUpdate(req.user._id, {$push: {projects: project}}, {new: true}, function(err, user) {
      // console.log(user); // confirms user object

       // send the updated user info back to angular
      res.send(user);
    });
  });
});

// GET / SHOW -- all projects in active user's projects array (for stats directive)
router.get("/get", function(req, res) {
  // console.log('TEST GET REQ.USER', req.user);
  // console.log('TEST GET REQ.USER.ID', req.user._id);

  // access active user's document in database
  User.findById(req.user._id, function(err, user) {
    // console.log(user.projects);

    // send projects array back to angular
    res.send(user.projects);
  });
});

// UPDATE -- update existing project name
router.put("/project/:pid", function(req, res) {
  // console.log('project put req.body, ', req.body);
  // console.log('PROJECT PUT REQ.BODY.NAME: ', req.body.name);

  // find selected project in projects collection and overwrite using req.body
  Project.findByIdAndUpdate(req.params.pid, req.body, function(err, project) {

    // find selected project in active user's projects array and save revised project name
    User.update({_id: req.user._id, "projects._id": req.params.pid}, {$set: {"projects.$.name": req.body.name}}, function(err, user) {
      // console.log('PROJECT PUT USER: ', user);

      // send user object back to angular
      res.send(user);
    });
  });
});

// DELETE -- remove an existing project (with all associated tasks)
router.delete("/project/:pid", function(req, res) {
  // console.log('PROJECT DELETE REQ.BODY');

  // find selected project in projects collection
  Project.findByIdAndRemove(req.params.pid, function(err, data) {

    // pull selected project from active user's projects array
    User.update({_id: req.user._id}, {$pull: {"projects": {_id: req.params.pid}}}, function(err, data) {
      res.send("deleted");

    });
  });
});

// ==============================
//          TASK ROUTES
// ==============================

// NEW -- create new task
router.post("/tasks/:pid", function(req, res) {
  // console.log(req.body);

  // create new task using incoming data and task model
  Task.create(req.body, function(err, task) {

    // create new task using incoming data and task model
    Project.findById(req.params.pid, function(err, project) {
      project.tasks.push(task); // error here when you remove tasks & user_project html files from partials
      project.save(function(err, data) {
        // console.log("task saved");

        // update project with new task in user's embedded tasks array
        User.update({_id: req.user._id, "projects._id": req.params.pid}, {$push: {"projects.$.tasks": task}}, function(err, data) {
          console.log("user update data: ", data);

          // send confirmation to angular
          res.send("created task");

        });
      });
    });
  });
});

// GET / SHOW -- get all tasks in selected project
router.get("/tasks/:pid", function(req, res) {
  // console.log("get params, ", req.params.pid)

  // find selected project in projects collection
  Project.findById(req.params.pid, function(err, project) {
    console.log("project: ", project)
    // console.log(project);

    // send project data back to angular
    res.send(project);
  });
});

// UPDATE-- update an existing task
router.put("/tasks/:pid/:tid", function(req, res) {
  // console.log("PROJECT ID: ", req.params.pid);
  // console.log("TASK ID: ", req.params.tid);
  // console.log(req.body);

  // var pid = req.params.pid;
  // var tid = req.params.tid;
  // var task_data = req.body;

  // find selected task in task collection and overwrite existing data using req.body
  Task.findByIdAndUpdate(req.params.tid, req.body, function(err, task) {
    // console.log(task);

    // update task in parent project's tasks array
    Project.update({_id: req.params.pid, "tasks._id": req.params.tid}, {$set: {"tasks.$": req.body}}, {new: true}, function(err, data) {

      // find selected project in project collection
      Project.findById(req.params.pid, function(err, project) {
        // console.log("PROJECT?: ", project);

        // save project data to updatedProject
        var updatedProject = project;

        // find selected project in active user's project array and overwrite existing data using updatedProject
        User.update({_id: req.user._id, 'projects._id': updatedProject._id}, {$set: {'projects.$': updatedProject}}, {new: true}, function(err, user) {

          // send the user object back to angular
          res.send(user);
        });
      });
    });
  });
});

// DELETE-- remove an existing task
router.delete("/tasks/:pid/:tid", function(req, res) {
  // console.log("project id, ", req.params.pid);
  // console.log("task id, ", req.params.tid);

  // find selected task and delete from task collection
  Task.findByIdAndRemove(req.params.tid, function(err, data) {

    // pull task from the parent project document
    Project.update({_id: req.params.pid}, {$pull: {"tasks": {_id: req.params.tid}}}, function(err, data) {

      // pull task from parent project saved to users projects array
      User.update({_id: req.user._id, "projects._id": req.params.pid}, {$pull: {"projects.$.tasks": {_id: req.params.tid}}}, function(err, data) {

        // send confirmation back to angular
        res.send("deleted");
      });
    });
  });
});

module.exports = router; // export router

// ==============================
//          SCRAP CODE
// ==============================

// router.get("/", function(req, res) {
//   res.send("got here")
// })

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
