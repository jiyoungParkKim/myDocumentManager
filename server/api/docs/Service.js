'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('lodash');

var dirToExplore = [];
var baseDir;
var imgBaseDir;


function reloadRoot(){
	_.each(fs.readdirSync(baseDir), function(childItemName) {
		dirToExplore.push({label:childItemName});
		exports.baseDir = baseDir;
		exports.dirToExplore = dirToExplore;
    });
}

exports.reloadRoot = function(){
	reloadRoot();
};

//get directory tree
exports.tree = function(rootName, callback){
	callback(null, dirTreeRecursiveSync(path.join(baseDir, rootName)));
}
function dirTreeRecursiveSync(filename) {

    var stats = fs.lstatSync(filename),
        info = {
            path: filename.split(baseDir)[1],
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTreeRecursiveSync(filename + '/' + child);
        });
        if(info.children.length === 0){
            info.children = {};
        }
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }
    return info;
}
	
// create new node
exports.newNode = function(node, callback){
	var itemPath = path.join(baseDir, node.path);
	if(fs.existsSync(itemPath)){
		callback(node.name +  " is already exists", null);
	}else{
		callback(null, createNode(node));
	}
};

function createNode(node){
	var itemPath = path.join(baseDir,node.path);
	if (node.type === 'folder') {
		fs.mkdirSync(itemPath);
		node.children = {};
	}else if(node.type === 'file') {
		fs.writeFileSync(itemPath, '');
		node.children = [];
	}
	return node;
}

// save node
exports.save = function(node, callback) {
	fs.writeFile(path.join(baseDir, node.path), node.content, function (err) {
		if (err) callback(err, null);
		callback(null, {'msg':'ok'});
	});
};

// delete node recursively
exports.removeNode = function(node, callback) {
	
	var itemPath = path.join(baseDir,node.path);
	if(fs.existsSync(itemPath)){
		deleteRecursiveSync(itemPath);
		callback(null, node);
	}else{
		callback(node.name + " is not exists", null);
	}
};
function deleteRecursiveSync(itemPath) {
    if (fs.statSync(itemPath).isDirectory()) {
        _.each(fs.readdirSync(itemPath), function(childItemName) {
            deleteRecursiveSync(path.join(itemPath, childItemName));
        });
        fs.rmdirSync(itemPath);
    } else {
        fs.unlinkSync(itemPath);
    }
}


exports.read = function(node, callback){
	fs.readFile(path.join(baseDir,node.path), 'utf8', function (err, data) {
	  if (err) callback(err, null);
	  else callback(null, data);
	});
};

exports.newRoot = function(newRoot, callback){
	var itemPath = path.join(baseDir, newRoot.rootName);
	fs.mkdir(itemPath, function(err){
		if (err) callback(err, null);
		else {
			dirToExplore = [];
			reloadRoot();
			callback(null, dirToExplore);
		}
		
	});
	
};



//initialization
imgBaseDir = config.imgRoot;
baseDir = config.docRoot;

if(!fs.existsSync(baseDir)){
	fs.mkdirSync(baseDir);
	dirToExplore.push({});
}

if(!fs.existsSync(imgBaseDir)){
	fs.mkdirSync(imgBaseDir);
}

reloadRoot();