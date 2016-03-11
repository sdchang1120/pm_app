var app = angular.module("stats-directive", []);

// DIRECTIVE FOR STATS
app.directive("statsDirective", [function() {
  return {
    restrict: "E",
    controller: "StatsController",
    templateUrl: "partials/stats.html",
    controllerAs: "statsCtrl"
  }
}]);


// STATS CONTROLLER
app.controller("StatsController", ["$http", "$scope", function($http, $scope) {

  var test = "testing"

  // console.log($scope)
  
  this.test = "stats"

  var controller = this;

  var userProjects = null;

  // global variables for parseUserStats
  // var totalTasks = 0;
  // var completed = 0;
  // var remaining = 0;

  this.totalTasks = 0;
  this.completed = 0;
  this.remaining = 0;
  // this.projectCount = 0;

  // function to parse through the users stats and render the chart
  this.parseUserStats = function(userProjects) {

    // iterate through each project in the array
    // console.log(userProjects.length);

    // controller.projectCount = userProjects.length;

    // for loop for each project in the array
    for (var i = 0; i < userProjects.length; i++) {

      // console.log(userProjects[i].tasks)
      // for loop for each task in the project
      for (var j = 0; j < userProjects[i].tasks.length; j++) {

        // if the task is completed, add to completed counter
        if (userProjects[i].tasks[j].completed === true) {
          controller.completed +=1;

        // if the task is null or incomplete, add to remaining counter
        } else {
          controller.remaining +=1;
        }
      } // closes j loop 

    } // closes i loop 

    // confirming variables
    console.log("completed: ", controller.completed);
    console.log("remaining: ", controller.remaining);

    // data for the chart-- uses the parsed info
    var data = [
      {
        value: controller.completed,
        color: "#23cfe6",
        label: "completed"
      },
      {
        value: controller.remaining,
        color: "#fe585a",
        label: "remaining"
      }
    ];

    // only attempt to render graph if user has already created projects
    if (userProjects.length != 0) {

      // grab and fill the chart
      var context = document.getElementById("userStats").getContext("2d");
      var userChart = new Chart(context).Doughnut(data);

    };

  }; // closes parseUserStats function

  console.log(controller.completed);


  // get the user's project info
  $http({
    method: "GET",
    url: "/projects/get"
    }).then(
      // success function
      function(response) {
        // console.log(response.data);
        userProjects = response.data; // save projects array to userProjects variable
        // console.log(userProjects); // confirm variable

        // parse user stats with the received data
        controller.parseUserStats(userProjects);

      // error function
      }, function(error) {
        console.log(error);
  });

  // USER LOG

  // store user activities
  this.userActivityArray = null;

  // get all user info
  // this.getUser = function() {
    $http({
      method: "GET",
      url: "/users/getuserlog"
      }).then(
        // success function
        function(response) {
          // console.log(response.data);
          controller.userActivityArray = response.data.activity; // save activity array to userActivityArray variable
          // console.log(controller.userActivityArray)

        // error function
        }, function(error) {
          console.log(error);
    });

    

  // }


  // $scope.$on("show-stats", function(eventObject, data) {
  //   console.log(eventObject);
  //   console.log(data);

  //   controller.data = "hi"

  // });



}]);