var express = require('express');
var config = require('./config');
//var message = require('./routes/message');
var urlencoded = require('body-parser').urlencoded;
//var voice = require('./routes/voice');

var app = express();
app.use(urlencoded({ extended: true }));
app.use(express.static('static'));

//app.post('/api/sms', message);
//app.post('/api/call', voice)

module.exports = app;