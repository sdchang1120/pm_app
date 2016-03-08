// PROJECTS DIRECTIVE
var app = angular.module("projects-directive", ["tasks-directive"]);

// PROJECTS DIRECTIVE
app.directive('projectsDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsController',
    controllerAs: 'projectsCtrl'
  }
});

// PROJECTS CONTORLLER
app.controller("ProjectsController", ["$scope", "$http", "updateLog", function($scope, $http, updateLog) {

  this.test = "project controller";

  var controller = this;


  this.thisProject = function(project) {
    console.log(project);
    controller.hideProjects = true;

    $scope.$broadcast("project-data", project);
  }

  // console.log($scope.mainCtrl.user.projects);

  // ==============================
  //      GET UERS'S PROJECTS
  // ==============================

  // get all of user's projects
  this.getProjects = function() {
    $http({
    method: "GET",
    url: "/projects/get"
    }).then(
      function(response) {
        // console.log(response.data);
        controller.projects = response.data;

      }, function(error) {

    })
  };

  this.getProjects();

  // ==============================
  //    CREATE/POST NEW PROJECT
  // ==============================

  // add a new project
  this.addProject = function(project) {
    // console.log('addProject, ', data);

    console.log("data ", project.name);

    // post request to server
    $http({
      method: "POST",
      url: "/projects/new",
      data: project
      }).then(
      function(response){
        console.log(response.data);

        // update the user log
        var updateData = {message: "user has added a new project: " + project.name};
        updateLog.method(updateData)

        // refresh projects
        controller.getProjects();

      }, function(error) {
        console.log(error)
    });
  };

  // ==============================
  //         UPDATE PROJECT
  // ==============================

  // update project
  this.updateProject = function(project) {
    // console.log(project);
    // var projectId = project._id;

    // put request to server
    $http({
      method: "PUT",
      url: "/projects/project/" + project._id,
      data: project
      }).then(
        function(response) {
          console.log(response);

          // update the user log
          var updateData = {message: "user has updated a project: " + project.name};
          updateLog.method(updateData);

          // refresh projects
          controller.getProjects();

        }, function(error) {
          console.log(error)

      })

  }

  // ==============================
  //         DELETE PROJECT
  // ==============================

  // delete project
  this.deleteProject = function(project) {
    // console.log(project);

    // delete request to server
    $http({
      method: "DELETE",
      url: "/projects/project/" + project._id
    }).then(
      function(response) {
        console.log(response);

        // update the user log
        var updateData = {message: "user has deleted a project: " + project.name};
        updateLog.method(updateData);

        // refresh projects
        controller.getProjects();

      }, function(error) {
        console.log(error)
      })
  }




}]);
