var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


// test test test

app.listen(port, function() {
  console.log('LISTENING ON PORT: ', port);
})
