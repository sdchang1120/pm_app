// REQUIREMENTS
var mongoose = require('mongoose');

// SETTING UP TASK SCHEMA
var taskSchema = mongoose.Schema({
  name: String,
  completed: false
})

// EXPORT USER
module.exports = mongoose.model('Task', taskSchema);
