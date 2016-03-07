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


app.controller("TaskController", ["$http", "$scope", function($http, $scope) {

  var controller = this;
  this.test = "task controller";

  // get project object
  $scope.$on("project-data", function(eventObject, project) {
    console.log("task controller, ", project);
    controller.project = project;
    controller.projId = project._id;
  });


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

  // create new task
  this.newTask = {
    name: null
  }


  this.addTask = function() {
    console.log("PROJECT ID", controller.projId)
    $http({
    method: "POST",
    url: "/projects/tasks/" + controller.projId, 
    data: this.newTask
    }).then(
      // success function
      function(response) {
        console.log(response);
        controller.getTasks();

      // error function
      }, function(error) {
        console.log(error)

    });
  };





}]);