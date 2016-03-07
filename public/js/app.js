var app = angular.module("PMApp", []);

// PROJECTS DIRECTIVE
app.directive('projectsDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsController',
    controllerAs: 'projectsCtrl'
  }
});

// PROJECTS CONTROLLER
app.controller('ProjectsController', ['$http', '$scope', function($http, $scope) {
  // $http.get('/users').then(
  //   function(result) {
  //     console.log(result);
  //   },
  //   function() {
  //     console.log(err);
  //   }
  // )

  this.name = null;

  this.newProject = {
    // name: '',
    // tasks: [],
    // completed: false
  };

  var ctrl = this;
  this.addProject = function(data) {
    $http.post('/users/postproject', data).then(
      function(result) {
        console.log('RESULT: ', result.data);
        // clears form
        ctrl.newProject = {}
      },
      function(err) {
        // console.log(data);
        console.log('ERROR: ', err);
      }
    )
  }
}]);



app.controller("MainController", ["$scope", "$http", function($scope, $http) {
  // $scope.user = {};
  var controller = this;
  this.user = {};
  this.isAuthenticated = false;

  // listen for user-login event. when logged in, save user data to controller
  $scope.$on("user-login", function(eventObject, userData) {
    console.log(userData);

    // save user data to controller
    controller.user = userData;
    controller.isAuthenticated = true;

  });

  // end passport session
  this.logout = function() {
    $http({
      method:"GET",
      url: "users/logout"
      }).then(
        // sucess function
        function(response) {
          console.log(response);

          // toggle authentication status
          controller.isAuthenticated = false;

        // error function
        }, function(error) {
          console.log(error);
    });
  }

}]);



app.controller("SignupController", ["$scope", "$http", function($scope, $http) {

  var controller = this;

  // credential object to be passed to users/signup route in signup function
  this.credentials = {
    username: null,
    password: null,
    email: null
  };

  this.signup = function() {

    console.log(this.credentials); // confirms object returns

    $http.post('/users/signup', this.credentials).then(
        // success function
        function(response) {
          console.log(response);

          // emit user data to parent controllers
          $scope.$emit("user-login", response.data);
            // I don't know if it will be a problem later to use the same event listener for login and signup
            // I think it will be ok because the user is essentially logging in immediately after signing up

        // error function
        }, function(error) {
          console.log(error);
    });

  };

}]);



app.controller("LoginController", ["$scope", "$http", function($scope, $http){

  var controller = this;

  // credential object to be passed to users/login route in login function
  this.credentials = {
    username: null,
    password: null
  }

  this.login = function() {
    console.log(this.credentials); // confirms object returns

    $http({
      method: "POST",
      url: "users/login",
      data: controller.credentials
      }).then(
        // success function
        function(response) {
          // console.log(response);
          console.log(response.data); // user object

          // emit user data to parent controller(s)
          $scope.$emit("user-login", response.data);

        // error function
        }, function(error) {
          console.log("error");
          console.log(error);
    });

  };

}]);



app.controller("AnotherController", ["$scope", "$http", function($scope, $http) {
  this.test = "another controller";
}]);


// 200 is authorized, 401 is error
