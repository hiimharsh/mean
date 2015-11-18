var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database, function (err) {
  // body...
  if(err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
})

var app = express();

app.use (bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json());
app.use (morgan('dev'));

var api = require('./app/route/api')(app, express);
app.use('/api', api);

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
