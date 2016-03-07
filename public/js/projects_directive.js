// CANNOT INCLUDE THIS IN APP.JS AS A DEPENDENCY. WHY?
var app = angular.module('projects-directive', []);

app.directive('projectsDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsController',
    controllerAs: 'projectsCtrl'
  }
});

app.controller('ProjectsController', function() {
  this.hello = 'hello';
});
