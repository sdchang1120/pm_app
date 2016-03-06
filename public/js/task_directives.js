var app = angular.module("task-directives", []);

// DIRECTIVE FOR TO DO LIST
app.directive("todoList", [function() {
  return {
    restrict: "E",
    controller: "TaskController",
    templateUrl: "partials/tasks.html",
    controllerAs: "taskCtrl"
  }
}]);


// PARENT CONTROLLER FOR TODO LIST
app.controller("TaskController", ["$http", "$scope", function($http, $scope) {

  var controller = this;
  // this.test = "task controller";

  // empty array of tasks
  this.tasks = [];

  // fetch and load all the tasks
  this.getTasks = function() {
    $http({
    method: "GET",
    url: "users/gettasks" // this path will change
    }).then(
      // success function
      function(response) {
        console.log(response.data);
        controller.tasks = response.data;

      // error function
      }, function(error) {
        console.log(error);
    });
  }

  this.getTasks();


  // create new task
  this.newTask = {
    name: null
  }

  this.addTask = function() {
    $http({
    method: "POST",
    url: "users/newtask", // this path will change
    data: this.newTask
    }).then(
      // success function
      function(response) {
        console.log(response);
        // re-render the list of tasks
        controller.getTasks();

      // error function
      }, function(error) {

    });
  };


  // delete task
  this.deleteTask = function(task) {
    var index = controller.tasks.indexOf(task);
    // console.log($scope.taskCtrl.tasks[index]);
    console.log(this.tasks[index]._id);
    var taskId = $scope.taskCtrl.tasks[index]._id;

    $http({
      method: "DELETE",
      url: "users/deletetask/" + taskId,
      }).then( 
        // sucess function
        function(response) {
          // re-render the list of tasks
          controller.getTasks();

        // error function
        }, function(error) {
          console.log(error)
    });

  };

  // update task
  // show the form
  // this.updateForm = false;

  this.updateIndex = null;
  this.updateForm = false;

  // toggle the form
  this.showUpdate = function(task) {
    console.log(task)
    controller.updateIndex = controller.tasks.indexOf(task);
    this.updateForm = !this.updateForm

  };

  // data to update
  this.updateTaskObject = {
    name: null
  }

  this.updateTask = function() {
    console.log(controller.updateTaskObject);
    console.log(controller.tasks[controller.updateIndex]); // object being updated
    var taskId = controller.tasks[controller.updateIndex]._id;

    $http({
      method: "PUT",
      url: "users/updatetask/" + taskId,
      data: controller.updateTaskObject
      }).then(
        // success
        function(response){
          // re-render the list of tasks
          controller.getTasks();


        // failure
        }, function(error) {
          console.log(error)

    })
    

  }

}]);




// DELETE A TASK 


// ADD A TASK 
// app.controller("CreateTaskController", ["$http", function($http) {

//   this.newTask = {
//     name: null
//   }

//   this.addTask = function() {
//     $http({
//     method: "POST",
//     url: "users/newtask", // this path will change
//     data: this.newTask
//     }).then(
//       // success function
//       function(response) {
//         console.log(response)

//       // error function
//       }, function(error) {

//     });
//   };

// }]);


// UPDATE A TASK
// app.controller("UpdateTaskController", ["http", function($http) {



// }])




