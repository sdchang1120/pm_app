// ==============================
//          REQUIREMENTS
// ==============================

var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");

var mongoUri = process.env.MONGOLAB_URI || "mongodb://localhost:27017/pm_app"
var port = process.env.PORT || 3000;
var app = express();


// ==============================
//           MIDDLEWARE
// ==============================

// connect to mongo
mongoose.connect(mongoUri);

// passport requirement
require("./config/passport")(passport);

// access public directory
app.use(express.static("public"));

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure cookie-parser
app.use(cookieParser());

// configure passport
app.use(session({ secret: "secret", resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());


// ==============================
//          CONTROLLERS
// ==============================

// USER'S CONTROLLER
var usersController = require("./controllers/usersController.js");
app.use("/users", usersController);

// PROJECT'S CONTROLLER
var projectsController = require("./controllers/projectsController.js");
app.use("/projects", projectsController);


// ==============================
//          CONNECTION
// ==============================

mongoose.connection.once('open', function() {
  app.listen(port, function() {
    console.log('LISTENING ON PORT: ', port);
  })
})
