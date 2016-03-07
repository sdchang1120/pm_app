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

    // post new project
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



  
}]);