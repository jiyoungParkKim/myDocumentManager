'use strict';
var service = require('./Service');
var _socket;

function handleError(res, err) {
	return res.send(500, err);
}

exports.register = function(socket){
	_socket = socket;
}

//Get list of docss
exports.index = function(req, res) {
	return res.json(200, service.dirToExplore);
};

exports.tree = function(req, res){
	service.tree(req.params.label, function (err, tree) {
		if(err) { return handleError(res, err); }
		if(!tree) { return res.send(404); }
		return res.json(tree);
	});
};

exports.newNode = function(req, res){
	service.newNode(req.body, function (err, newNode) {
		if(err) { return handleError(res, err); }
		return res.json(newNode);
	});
};

exports.destroy = function(req, res){
	service.removeNode(req.body, function (err, newNode) {
		if(err) { return handleError(res, err); }
		return res.json(newNode);
	});
};

exports.destroyRoot = function(req, res){
	service.removeNode(req.body, function (err, newNode) {
		if(err) { return handleError(res, err); }
		service.dirToExplore.length = 0;
		service.reloadRoot();
		if(_socket != null)
			_socket.emit('docs:remove', newNode);
		return res.json(newNode);
	});
};

exports.read = function(req, res){
	service.read(req.body, function (err, content) {
		if(err) { return handleError(res, err); }
		return res.json({'content':content});
	});
};

exports.save = function(req, res){
	service.save(req.body, function (err, msg){
		if(err) { return handleError(res, err); }
		return res.json(msg);
	});
};

exports.newRoot = function(req, res){
	service.newRoot(req.body, function(err, newRoots){
		if(err) { return handleError(res, err); }
		if(_socket != null)
			_socket.emit('docs:save', newRoots);
		return res.json(newRoots);
	});
};

