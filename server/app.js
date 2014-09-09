/**
 * Main application file
 */

'use strict';
var fs = require('fs');
//Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
global.config = require('./config/environment');


if(!fs.existsSync(global.config.docRoot)){
	fs.mkdir(global.config.docRoot, function(err){});
}


//console.log(process.env.NODE_ENV)
//console.log("config.mongo.uri : " + config.mongo.uri);
//console.log("config.mongo.options : " + config.mongo.options);
//console.log("config.port : " + config.port);
//console.log("config.ip : " + config.ip);

//Connect to database
//mongoose.connect(config.mongo.uri, config.mongo.options);

//Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io').listen(server);
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

//Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

//Expose app
exports = module.exports = app;