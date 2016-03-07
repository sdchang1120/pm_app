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

  // console.log('$SCOPE', $scope);

  // $scope.$on("project-data", function(eventObject, project) {
  //   console.log("task controller, ", project);
  //
  //   controller.project = project;
  //
  //
  // })




}]);
