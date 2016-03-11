var app = angular.module("tasks-directive", []);

// DIRECTIVE FOR TO DO LIST
app.directive("tasksDirective", [function() {
  return {
    restrict: "E",
    controller: "TaskController",
    templateUrl: "partials/tasks.html",
    controllerAs: "taskCtrl"
  }
}]);

// TASKS CONTROLLER
app.controller("TaskController", ["$http", "$scope", "$rootScope", "$routeParams", "updateLog", function($http, $scope, $rootScope, $routeParams, updateLog) {

  // console.log($routeParams)
  // console.log($route)
  // console.log($route.current.params.projectId)

  var controller = this;
  // this.test = "task controller";

  // get project object
  $scope.$on("project-data", function(eventObject, project) {
    // console.log("task controller, ", project);
    controller.project = project;
    controller.projId = project._id;
  });

  // save project id to controller based on route parameter
  $rootScope.$on("$routeChangeSuccess", function() {
    // console.log($routeParams.projId); // this is the project id

    $rootScope.currentProjId = $routeParams.projId; // save project id to root scope
    controller.projId = $rootScope.currentProjId; // save project id to controller

  });

  // var projId = $routeParams.projId;

  // console.log(projId);

  this.projId = $rootScope.currentProjId; // save project id to controller

  // console.log(controller.projId);


  // ==============================
  //           GET TASKS
  // ==============================

  this.projTasks = null;
  this.project = null;

  // fetch and load all the tasks
  this.getTasks = function() {
    $http({
    method: "GET",
    url: "/projects/tasks/" + $routeParams.projId  // this path will change
    }).then(
      // success function
      function(response) {
        // console.log("EXECUTED");
        console.log("get response, ", response.data.tasks);

        controller.project = response.data; // save project object to controller
        controller.projTasks = response.data.tasks; // save tasks array to controller

      // error function
      }, function(error) {
        console.log(error);
    });
  }

  // execute getTasks function
  this.getTasks();


  // ==============================
  //      CREATE/POST NEW TASK
  // ==============================

  // create new task
  this.newTask = {
    name: null
  }

  // add a task to project
  this.addTask = function() {
    // console.log("PROJECT ID", controller.projId);

    // post request to server
    $http({
    method: "POST",
    url: "/projects/tasks/" + controller.projId,
    data: this.newTask
    }).then(
      // success function
      function(response) {
        console.log(response);

        // update user log
        var updateData = {message: "added " + controller.newTask.name + " to " + controller.project.name}; // creates message to push to user activity
        updateLog.method(updateData); // updates user document in database

        // clears input field
        controller.newTask.name = "";

        // refresh tasks
        controller.getTasks();

      // error function
      }, function(error) {
        console.log(error);
    });
  };


  // ==============================
  //          DELETE TASK
  // ==============================

  // delete an existing task
  this.deleteTask = function(task) {
    // console.log("delete ", task);
    var index = controller.project.tasks.indexOf(task);
    // console.log(index);
    var taskId = controller.project.tasks[index]._id;
    // console.log(taskId);

    // delete request to server
    $http({
      method: "DELETE",
      url: "/projects/tasks/" + controller.projId + "/" + taskId
      }).then(
        // success function
        function(response) {
          console.log(response);

          // update user log
          var updateData = {message: "deleted " + task.name + " from " + controller.project.name}; // creates message to push to user activity
          updateLog.method(updateData); // updates user document in database

          // refresh tasks
          controller.getTasks(); // I dont think this is working

        // error function
        }, function(error) {
          console.log(error);
    });
  };


  // ==============================
  //          UPDATE TASK
  // ==============================

  // this.formData = {
  //   name: task.name
  // };

  // toggle checkbox (complete boolean)
  this.complete = null;

  // update task
  this.updateTask = function(task) {
    // console.log(task);

    var index = controller.projTasks.indexOf(task);
    // console.log("index: ", index);
    var taskId = controller.projTasks[index]._id;
    // console.log("taskId: ", taskId);
    // console.log(controller.formData)
    // console.log("task?: ", task.name)

    // put request to server
    $http({
      method: "PUT",
      url: "/projects/tasks/" + controller.projId + "/" + taskId,
      data: task
      }).then(
        // success function
        function(response) {
          console.log(response);

          // update user log
          var updateData = {message: "updated " + task.name + " in " + controller.project.name}; // creates message to push to user activity
          updateLog.method(updateData); // updates user document in database

          // refresh tasks
          controller.getTasks();


        // error function
        }, function(error) {
          console.log(error);
    });

  }

  // mark completed task as incomplete
    // (separate function because can't listen for a state change on a button/can't assign a model to a button)
  this.undoComplete = function(task) {
    console.log(task); // confirm task
    task.completed = false; // toggle completed value false

    // save the change to the database
    controller.updateTask(task);
  };

  // set deadline
  // this.setDeadline = function(task) {
  //   console.log("set deadline ", task);

  //   // select the button and save to $button variable
  //   var $button = $("deadline-" + task._id);

  //   console.log($button); // confirms correct button selected


  //   $(function(){
  //    $("deadline-" + task._id).appendDtpicker();
  //   });

  // }

}]);

// ==============================
//           SCRAP CODE
// ==============================

  // this.updateFormData = null;

  // // update a task
  // this.updateTask = function(task) {
  //   console.log("update task: ", task);

  //   var index = controller.project.tasks.indexOf(task);
  //   console.log("update task, index: ", index);
  //   var taskId = controller.project.tasks[index]._id;
  //   console.log("update task, id: ", taskId);

  //   console.log('update form data: ', controller.updateFormData);

  //   $http({
  //     method: "PUT",
  //     url: "/projects/tasks/" + controller.projId + "/" + taskId,
  //     data: controller.updateFormData
  //     }).then(
  //       function(response) {
  //         console.log(response);

  //       }, function(error) {
  //         console.log(error);

  //   })


  // }


  // // toggle checkbox (complete boolean)



  // this.taskComplete = function(task) {
  //   console.log(task);

  //   var index = controller.project.tasks.indexOf(task);
  //   var taskId = controller.project.tasks[index]._id;

  //   console.log(taskId);

  //   console.log(controller.project)

  // }


  // this.getTasks = function() {
  //   $http({
  //   method: "GET",
  //   url: "/projects/tasks/" + controller.projId  // this path will change
  //   }).then(
  //     // success function
  //     function(response) {
  //       console.log("EXECUTED")
  //       console.log("get response, ", response.data.tasks);
  //       controller.tasks = response.data;

  //     // error function
  //     }, function(error) {
  //       console.log(error);
  //   });
  // }

  // this.getTasks();
