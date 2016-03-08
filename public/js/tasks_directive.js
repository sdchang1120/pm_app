var app = angular.module("tasks-directive", []);

// DIRECTIVE FOR TO DO LIST
app.directive("tasksDirective", [function() {
  return {
    restrict: "E",
    controller: "TaskController",
    templateUrl: "partials/user_project.html",
    controllerAs: "taskCtrl"
  }
}]);

// TASKS CONTROLLER
app.controller("TaskController", ["$http", "$scope", "updateLog", function($http, $scope, updateLog) {

  var controller = this;
  this.test = "task controller";

  // get project object
  $scope.$on("project-data", function(eventObject, project) {
    // console.log("task controller, ", project);
    controller.project = project;
    controller.projId = project._id;
  });

  // ==============================
  //           GET TASKS
  // ==============================

  // fetch and load all the tasks
  this.getTasks = function() {
    $http({
    method: "GET",
    url: "/projects/tasks/" + controller.projId  // this path will change
    }).then(
      // success function
      function(response) {
        console.log("get response, ", response.data.tasks);
        controller.tasks = response.data.tasks;


      // error function
      }, function(error) {
        console.log(error);
    });
  }

  // this.getTasks();

  // ==============================
  //      CREATE/POST NEW TASK
  // ==============================

  // create new task
  this.newTask = {
    name: null
  }

  this.addTask = function() {
    // console.log("PROJECT ID", controller.projId)
    $http({
    method: "POST",
    url: "/projects/tasks/" + controller.projId,
    data: this.newTask
    }).then(
      // success function
      function(response) {
        console.log(response);

        // update the user log
        var updateData = {message: "user has added a new task (" + controller.newTask.name + ") to " + controller.project.name};
        updateLog.method(updateData);

        // refresh tasks
        controller.getTasks();

      // error function
      }, function(error) {
        console.log(error)

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

    $http({
      method: "DELETE",
      url: "/projects/tasks/" + controller.projId + "/" + taskId
    }).then(
      function(response) {
        console.log(response);

        // update user log
        var updateData = {message: "user has deleted a task (" + task.name + ") from " + controller.project.name};
        updateLog.method(updateData);

        // refresh tasks
        controller.getTasks(); // I dont think this is working

      }, function(error) {
        console.log(error)
    });
  }

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

    var index = controller.project.tasks.indexOf(task);
    // console.log("index: ", index);
    var taskId = controller.project.tasks[index]._id;
    // console.log("taskId: ", taskId);
    // console.log(controller.formData)
    // console.log("task?: ", task.name)


    $http({
      method: "PUT",
      url: "/projects/tasks/" + controller.projId + "/" + taskId,
      data: task
      }).then(
        // success function
        function(response) {
          console.log(response);

          // update user log
          var updateData = {message: "user has updated a task in " + controller.project.name};
          updateLog.method(updateData);


        // error function
        }, function(error) {
          console.log(error);
    });

  }

}]);




// SCRAP

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