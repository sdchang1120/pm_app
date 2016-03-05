// REQUIREMENTS
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// SETTING UP USER SCHEMA
var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  first_name: {type: String, required: true},
  last_name: String,
  email: String,
  password: {type: String, required: true},
  projects: []
})

// hasing password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validating password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// EXPORT USER
module.exports = mongoose.model('User', userSchema);
