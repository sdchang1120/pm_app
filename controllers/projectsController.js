var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users.js");
var Project = require('../models/projects.js');
var Task = require('../models/tasks.js');


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


// TASKS ROUTES


// create
router.post("/tasks/:pid", function(req, res) {
  console.log(req.body);


  // create new task
  Task.create(req.body, function(err, task) {

    // push task to tasks in project model
    Project.findById(req.params.pid, function(err, project) {
      project.tasks.push(task);
      project.save(function(err, data) {
        console.log("task saved");

        // update the project in user's task array
        User.update({_id: req.user._id, "projects._id": req.params.pid}, {$push: {"projects.$.tasks": task}}, function(err, data) {
          console.log("user update data: ", data);
          res.send("created task");

        })
      })
    })
  })
})


// get
router.get("/tasks/:pid", function(req, res) {
  console.log("get params, ", req.params.pid)
  Project.findById(req.params.pid, function(err, project) {
    console.log(project);
    res.send(project);
  })
})



// update
router.put("/tasks/:pid/:tid", function(req, res) {
  console.log("project id, ", req.params.pid);
  console.log("task id, ", req.params.tid);
  console.log(req.body);

  // update task in task model
  Task.findByIdAndUpdate(req.params.tid, req.body, function(err, task) {
    console.log(task);

    // update task in project model
    Project.update({_id: req.params.pid, "tasks._id": req.params.tid}, {$set: {"tasks.$.name": req.body.name}}, {new: true}, function(err, project) {
      
      console.log(project)

      // update project in user model
      User.update({_id: req.user._id, "projects._id": req.params.pid, "projects.tasks._id": req.params.tid}, {$set: {"projects.0.tasks.$.name": req.body.name}}, function(err, user) {
        res.send("it worked?")
      })

    })

  })


});


// User.update({_id: req.params.id, 'playlist._id': req.params.list}, {$set: {'playlist.$.playlist_name': req.body.playlist_name}}, function(err) {
//   });



// delete
router.delete("/tasks/:pid/:tid", function(req, res) {
  console.log("project id, ", req.params.pid);
  console.log("task id, ", req.params.tid);

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









module.exports = router;