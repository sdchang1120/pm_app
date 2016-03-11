// REQUIREMENTS
var mongoose = require('mongoose');
var taskSchema = require('./tasks.js').schema;

// SETTING UP PROJECT SCHEMA
var projectSchema = mongoose.Schema({
  name: String,
  tasks: [taskSchema],
  completed: false
});

// EXPORT USER
module.exports = mongoose.model('Project', projectSchema);
