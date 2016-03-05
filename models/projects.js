// REQUIREMENTS
var mongoose = require('mongoose');

// SETTING UP PROJECT SCHEMA
var projectSchema = mongoose.Schema({
  name: String,
  tasks: [],
  completed: false
})

// EXPORT USER
module.exports = mongoose.model('Project', projectSchema);
