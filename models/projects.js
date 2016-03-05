// REQUIREMENTS
var mongoose = require('mongoose');

// SETTING UP PROJECTS SCHEMA
var projectSchema = mongoose.Schema({
  name: String,
  tasks: [],
  completed: false
})

// EXPORT USER
module.exports = mongoose.model('Project', projectSchema);
