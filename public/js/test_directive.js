// PROJECTS DIRECTIVE
var app = angular.module("test-directive", []);


app.directive('testDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/test.html',
    controller: 'TestController',
    controllerAs: 'testCtrl'
  }
});


app.controller("TestController", ["$scope", "$http", function($scope, $http) {
  this.test = "test controller";

  console.log($scope.mainCtrl.user.projects);

  $http({
    method: "GET",
    url: "/test/get"
  }).then(function(response) {
    console.log(response)
  }, function(error) {

  })

  
}]);