// PROJECTS DIRECTIVE
var app = angular.module("projects-directive", []);


app.directive('projectsDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsController',
    controllerAs: 'projectsCtrl'
  }
});


app.controller("ProjectsController", ["$scope", "$http", function($scope, $http) {
  this.test = "project controller";

  var controller = this;

  // console.log($scope.mainCtrl.user.projects);

  // get all of user's projects
  this.getProjects = function() {
    $http({
    method: "GET",
    url: "/projects/get"
    }).then(
      function(response) {
        console.log(response.data);
        controller.projects = response.data;

      }, function(error) {

    })
  };

  this.getProjects();

  // add a new project
  this.addProject = function(data) {
    console.log('addProject, ', data);

    // post request to server
    $http({
      method: "POST",
      url: "/projects/new",
      data: data
      }).then(
      function(response){
        console.log(response.data);

        controller.getProjects();

      }, function(error) {
        console.log(error)
    });
  };


  // update project
  this.updateProject = function(project) {
    console.log(project);
    // var projectId = project._id;

    // put request to server
    $http({
      method: "PUT",
      url: "/projects/project/" + project._id,
      data: project
      }).then(
        function(response) {
          console.log(response);
          controller.getProjects();

        }, function(error) {
          console.log(error)

      })

  }


  // delete project
  this.deleteProject = function(project) {
    console.log(project);

    // delete request to server
    $http({
      method: "DELETE",
      url: "/projects/" + project._id
    }).then(then(
      function(response) {
        console.log(response)

      }, function(error) {
        console.log(error)
      }))
  }



  
}]);