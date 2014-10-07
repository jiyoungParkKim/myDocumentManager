'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

//All configurations will extend these options
//============================================
var all = {
env: process.env.NODE_ENV,

// Root path of server
root: path.normalize(__dirname + '/../../..'),

// Server port
port: process.env.PORT || 3000,

// Should we populate the DB with sample data?
seedDB: false,

// Secret for session, you will want to change this and make it an environment variable
secrets: {
 session: 'my-document-manager-secret'
},

// List of user roles
userRoles: ['guest', 'user', 'admin'],

// MongoDB connection options
mongo: {
 options: {
   db: {
     safe: true
   }
 }
},



docRoot : path.join(path.normalize(__dirname + '/../../..'),'docs'),
imgRoot : path.join(path.normalize(__dirname + '/../../..'),'client/assets/docs')

};

// console.log("__dirname : " + __dirname);
// console.log("__dirname2 : " + path.join(path.normalize(__dirname + '/../../..'),'client/asserts'));

//Export the config object based on the NODE_ENV
//==============================================
module.exports = _.merge(
all,
require('./' + process.env.NODE_ENV + '.js') || {});