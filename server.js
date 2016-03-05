// REQUIREMENTS
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");


var mongoUri = process.env.MONGOLAB_URI || "mongodb://localhost:27017/pm_app"
var port = process.env.PORT || 3000;
var app = express();

// MIDDLEWARE
// connect to mongo
mongoose.connect(mongoUri);

// passport requirement
require("./config/passport")(passport); 

// access public directory
app.use(express.static("public"));

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure passport
app.use(session({ secret: "secret", resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());

// controller
var usersController = require("./controllers/usersController.js");
app.use("/users", usersController);


// LISTEN
app.listen(port, function() {
  console.log('LISTENING ON PORT: ', port);
})
