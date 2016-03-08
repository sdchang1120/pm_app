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

  // console.log($scope)
  
  this.test = "stats"

  var controller = this;

  var userProjects = null;

  // global variables for parseUserStats
  var totalTasks = 0;
  var completed = 0;
  var remaining = 0;

  // function to parse through the users stats and render the chart
  this.parseUserStats = function(userProjects) {

    // iterate through each project in the array
    // console.log(userProjects.length);

    // for loop for each project in the array
    for (var i = 0; i < userProjects.length; i++) {

      // console.log(userProjects[i].tasks)
      // for loop for each task in the project
      for (var j = 0; j < userProjects[i].tasks.length; j++) {

        // if the task is completed, add to completed counter
        if (userProjects[i].tasks[j].completed === true) {
          completed +=1;

        // if the task is null or incomplete, add to remaining counter
        } else {
          remaining +=1;
        }
      } // closes j loop 

    } // closes i loop 

    // confirming variables
    console.log("completed: ", completed);
    console.log("remaining: ", remaining);

    // data for the chart-- uses the parsed info
    var data = [
      {
        value: completed,
        color: "blue",
        label: "completed"
      },
      {
        value: remaining,
        color: "red",
        label: "remaining"
      }
    ]

    // grab and fill the chart
    var context = document.getElementById("userStats").getContext("2d");
    var userChart = new Chart(context).Doughnut(data);

  }; // closes parseUserStats function


  // get the user's project info
  $http({
    method: "GET",
    url: "/projects/get"
    }).then(
      // success function
      function(response) {
        // console.log(response.data);
        userProjects = response.data;
        // console.log(userProjects); // confirm variable

        // parse user stats with the received data
        controller.parseUserStats(userProjects)


      // error function
      }, function(error) {
        console.log(error);

  });



  // $scope.$on("show-stats", function(eventObject, data) {
  //   console.log(eventObject);
  //   console.log(data);

  //   controller.data = "hi"

  // });



}]);