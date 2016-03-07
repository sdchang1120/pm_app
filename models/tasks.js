// REQUIREMENTS
var mongoose = require('mongoose');

// SETTING UP TASK SCHEMA
var taskSchema = mongoose.Schema({
  name: String,
  deadline: {type: Date},
  completed: false
})

// EXPORT USER
module.exports = mongoose.model('Task', taskSchema);
