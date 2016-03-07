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
