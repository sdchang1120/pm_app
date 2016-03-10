// REQUIREMENTS
var mongoose = require('mongoose');

// SETTING UP TASK SCHEMA
var taskSchema = mongoose.Schema({
  name: String,
  deadline: {type: Date},
  completed: {type: Boolean, default: false} // default to false
})

module.exports = mongoose.model('Task', taskSchema); // export Task
