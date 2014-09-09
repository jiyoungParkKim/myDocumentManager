
var app= angular.module('myDocumentManagerApp');
//Service definition
app.service('docService', function(){


	

	////////////// TREE ////////////////////

	this.loadTree = function($scope, $http){
		loadTree($scope, $http);
	};
	
	function loadTree($http, $scope){
		$http.get('/api/docs/' + $scope.treedata.name)
		.success(function(rtnData) {
			$scope.treedata.children.push(rtnData);
			if($scope.expandedNodes.length == 0)
				$scope.expandedNodes.push($scope.treedata.children[0]);
		});
	}

	/////////////// DOC ROOTS //////////////////////////

	this.loadDocRoots = function($http, socket, callback){
		$http.get('/api/docs').success(function(docRoots) {
          socket.syncUpdates('docs', docRoots);
          callback(null, docRoots);
        });
	};

	this.addNewRoot = function($http, newRootName){
  		$http.post('/api/docs/newRoot', {'rootName': newRootName});
	};

	this.deleteRoot = function($http, root){
		$http.post('/api/docs/deleteRoot', {name:root.label, path:root.label} );
	};

	//////////////// CRUD TREE NODES ///////////////////////////


	this.createNode = function($scope, $http, type){
		var node = {
			'name':$scope.newNodeName, 
			'path':$scope.selectedNode.path + '/' + $scope.newNodeName, 
			'type':type};
		
		$http.post('/api/docs', node )
		.success(function (data) {
			if($scope.selectedNode != $scope.docRoot)
			$scope.expandedNodes.push($scope.selectedNode)
       	
	       	if(!angular.isArray($scope.selectedNode.children))
	       		$scope.selectedNode.children = [];

	   		$scope.selectedNode.children.push(data);	   		
	   		$scope.selectedNode = data;

	   		$scope.newNodeName = '';

	   		//addAlert($scope, data.name + " is created");
       	
        }).error(function (err) {
       		addErrAlert($scope, err);
        });
	};

	this.removeNode = function($scope, $http){
		var node = {
			name:$scope.selectedNode.name, 
			path:$scope.selectedNode.path
		};
		
		$http.post('/api/docs/delete', node )
		.success(function (data, status, headers, config) {
			//addAlert($scope, data.name + " is deleted");
			$scope.treedata.children.length = [];
			loadTree($http, $scope);
			delete data;
		}).error(function (msg, status) {
			addErrAlert($scope, msg);
	       	
	    });
	};

	this.readFile = function($http, nodePath, callback){
		$http.post('/api/docs/read', {'path': nodePath})
		.success(function (data, status, headers, config) {
			callback(null, data.content);
	    }).error(function (msg, status) {
	    	callback(msg, null);
	    });
	}

	this.saveNode = function($scope, $http, callback){
		console.log($scope.ACE_EDITOR.getValue());
		$http.post('/api/docs/save', {'path': $scope.selectedNode.path,
									  'content': $scope.ACE_EDITOR.getValue()}).
	    success(function (data, status, headers, config) {
	    	callback(null, $scope.selectedNode.name + " is saved");
	    	//addAlert($scope, $scope.selectedNode.name + " is saved");
	    }).error(function (msg, status) {
	    	callback(msg, null);
			//addErrAlert($scope, msg);
	    });
	}

});