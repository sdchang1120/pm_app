var app = angular.module("ProjectsController", []);

// PROJECTS CONTORLLER
app.controller("ProjectsController", ["$scope", "$http", "updateLog", function($scope, $http, updateLog) {

  var controller = this;

  // select project to show
  this.thisProject = function(project) {
    console.log(project);
    controller.hideProjects = true;

    $scope.$broadcast("project-data", project);
  };

  // console.log($scope.mainCtrl.user.projects);

  // ==============================
  //      GET UERS'S PROJECTS
  // ==============================

  // retrieves all of user's projects from server
  this.getProjects = function() {

    // get request to server
    $http({
    method: "GET",
    url: "/projects/get"
    }).then(
      // success function
      function(response) {
        // console.log(response.data);
        controller.projects = response.data; // save projects array to controller

      // error function
      }, function(error) {
        console.log(error);
    });
  };

  // execute getProjects() on page load
  this.getProjects();

  // ==============================
  //    CREATE/POST NEW PROJECT
  // ==============================

  // adds a new project
  this.addProject = function(project) {
    // console.log('addProject, ', data);
    console.log("data ", project.name);

    // post request to server
    $http({
      method: "POST",
      url: "/projects/new",
      data: project
      }).then(
      // success function
      function(response){
        console.log(response.data);

        // update the user log
        var updateData = {message: "added " + project.name}; // creates message to push to user activity
        updateLog.method(updateData); // updates user document in database

        // clear input field
        controller.newProject.name = "";

        // refresh projects
        controller.getProjects();

      // error function
      }, function(error) {
        console.log(error);
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
        // success function
        function(response) {
          console.log(response);

          // update the user log
          var updateData = {message: "updated " + project.name}; // creates message to push to user activity
          updateLog.method(updateData); // updates user document in database

          // refresh projects
          controller.getProjects();

        // error function
        }, function(error) {
          console.log(error)
      });
  };

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
        // success function
        function(response) {
          console.log(response);

          // update the user log
          var updateData = {message: "deleted " + project.name}; // creates message to push to user activity
          updateLog.method(updateData); // updates user document in database

          // refresh projects
          controller.getProjects();

        // error function
        }, function(error) {
          console.log(error);
    });
  };

}]);

// ==============================
//          SCRAP CODE
// ==============================

// PROJECTS DIRECTIVE
// app.directive('projectsDirective', function() {
//   return {
//     restrict: 'E',
//     templateUrl: 'partials/projects.html',
//     controller: 'ProjectsController',
//     controllerAs: 'projectsCtrl'
//   }
// });
