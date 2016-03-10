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

  // select project to show
  this.thisProject = function(project) {
    console.log(project);
    controller.hideProjects = true;

    $scope.$broadcast("project-data", project);
  }

  // console.log($scope.mainCtrl.user.projects);

  // GET/SHOW -- all of user's projects
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

  this.getProjects(); // invoke function

  // POST/CREATE -- add a new project
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
        var updateData = {message: "added " + project.name};
        updateLog.method(updateData);
        controller.newProject.name = ""; // clears the input field
        // refresh projects
        controller.getProjects();
      }, function(error) {
        console.log(error)
    });
  };

  // PUT/UPDATE - update project
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
          var updateData = {message: "updated " + project.name};
          updateLog.method(updateData);
          // refresh projects
          controller.getProjects();
        }, function(error) {
          console.log(error)
      })
  }

  // DELETE - delete project
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
        var updateData = {message: "deleted " + project.name};
        updateLog.method(updateData);
        // refresh projects
        controller.getProjects();
      }, function(error) {
        console.log(error)
      });
  };

}]); // end of ProjectsController
