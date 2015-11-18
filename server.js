var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');

var app = express();

app.use (bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json());
app.use (morgan('dev'));

app.get('*', function (req, res) {
  // body...
  res.sendFile(__dirname + '/public/views/index.html');
})

app.listen(config.port, function (err) {
  // body...
  if(err) {
    console.log(err);
  } else {
    console.log("listening to 3000");
  }
})
