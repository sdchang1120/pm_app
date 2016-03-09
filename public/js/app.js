var app = angular.module("PMApp", ["projects-directive", "tasks-directive", "stats-directive", "ngRoute"]);

// ==============================
//        ANGULAR ROUTING
// ==============================

app.controller('ProfileController', ['$routeParams', function($routeParams) {
  this.name = 'Profile Controller';
  this.id = $routeParams.id;
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true});
  $routeProvider.
    when('/signup', {
      templateUrl: 'routing/signup.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    }).
    when('/login', {
      templateUrl: 'routing/login.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    }).
    when('/about', {
      templateUrl: 'routing/about.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    }).
    when('/projects', {
      templateUrl: 'routing/projects.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    }).
    when('/stats', {
      templateUrl: 'routing/stats.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    }).
    when('/profile', {
      templateUrl: 'routing/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profileCtrl'
    }).
    otherwise({
      redirectTo: '/'
    })
}])


// ==============================
//       END ANGULAR ROUTE
// ==============================

// service-- function can be accessed across different controllers
app.service("updateLog", ["$http", function($http) {
  var updateLog = {};

  updateLog.method = function(object) {

    console.log(object)

    $http({
      method: "PUT",
      url: "/users/userlog",
      data: object
      }).then(
        function(response){
          console.log(response);
        }, function(error) {
          console.log(error);
    })

  }

  return updateLog;

}]);

// MAIN CONTROLLER
app.controller("MainController", ["$scope", "$http", function($scope, $http) {
  var controller = this;
  this.user = {};
  this.isAuthenticated = false;

  // listen for user-login event. when logged in, save user data to controller
  $scope.$on("user-login", function(eventObject, userData) {
    // console.log('MAINCTRL USER DATA: ', userData);

    // sets userId as global variable
    $scope.userId = userData._id;

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

  this.showStats = false;

  // show stats
  this.showStatsFn = function() {
    controller.showStats = !controller.showStats;

    // console.log(controller.showStats);

    // event for stats controller to listen for
    $scope.$broadcast("show-stats", {message: "test"});
  };


  this.testService = function() {
    updateLog.method();
    // console.log("hi")
  }
  // update user log
  // this.updateLog = function() {
  //   console.log("update log")
  // }

}]);

// SIGNUP CONTROLLER
app.controller("SignupController", ["$scope", "$http", function($scope, $http) {

  var controller = this;

  // credential object to be passed to users/signup route in signup function
  this.credentials = {
    username: null,
    password: null,
    email: null
  };

  this.signup = function() {

    // console.log(this.credentials); // confirms object returns

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

// LOGIN CONTROLLER
app.controller("LoginController", ["$scope", "$http", function($scope, $http){

  var controller = this;

  // credential object to be passed to users/login route in login function
  this.credentials = {
    username: null,
    password: null
  }

  this.login = function() {
    // console.log(this.credentials); // confirms object returns

    $http({
      method: "POST",
      url: "users/login",
      data: controller.credentials
      }).then(
        // success function
        function(response) {
          // console.log(response);
          // console.log('LOGIN USER DATA: ', response.data); // user object

          // emit user data to parent controller(s)
          $scope.$emit("user-login", response.data);

        // error function
        }, function(error) {
          console.log("error");
          console.log(error);
    });

  };

}]);


// // ANOTHER CONTROLLER
// app.controller("AnotherController", ["$scope", "$http", function($scope, $http) {
//   this.test = "another controller";
// }]);


// 200 is authorized, 401 is error
