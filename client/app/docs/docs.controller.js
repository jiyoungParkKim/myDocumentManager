angular.module('myDocumentManagerApp')
.controller('DocsCtrl', function ($scope, $http, $stateParams, $modal, docService, tools) {

	$scope.getCurrentScope = function(){
		return $scope;
	};

	$scope.showBottomToolbar = function(){
		return editor.session.getLength() > 20;
	};

	// tree //////////////////////////////////
	$scope.opts = {
		injectClasses: {
			"ul": "c-ul",
			"li": "c-li",
			"liSelected": "c-liSelected",
			"iExpanded": "c-iExpanded",
			"iCollapsed": "c-iCollapsed",
			"iLeaf": "c-iLeaf",
			"label": "c-label",
			"labelSelected": "c-labelSelected"
		}
	};
     
	$scope.isTreeOn = true;

	$scope.treedata = {
		name:$stateParams.docRoot, 
		path:$stateParams.docRoot, 
		type:'folder', children:[]
	};

	docService.loadTree($http, $scope);
	
	$scope.selectNode = function(sel) {
		$scope.selectedNode = sel;
		if($scope.selectedNode.type === 'file'){
			docService.readFile($http, $scope.selectedNode.path, function(err, content){
				if(err) handleErr(err);
				else{
					$scope.content = content;
					$scope.HTML_VIEWER.setValue(content);
					$scope.ACE_EDITOR.setValue(content);
				}
			});
		}
    };
   
	$scope.createNode = function(type){
		docService.createNode($scope, $http, type, function(err, newNode){
			if(err) handleErr(err);
			else{

				if($scope.selectedNode != $scope.docRoot)
					$scope.expandedNodes.push($scope.selectedNode)
	       	
		       	if(!angular.isArray($scope.selectedNode.children))
		       		$scope.selectedNode.children = [];

		   		$scope.selectedNode.children.push(newNode);	   		
		   		$scope.selectedNode = newNode;

		   		$scope.newNodeName = '';

		   		$scope.content = '';
		   		$scope.reset();
		   		$scope.isEditorOn = true;

		   		//addAlert($scope, data.name + " is created");
			}
		});
	};

	$scope.removeNode = function(){
		if (confirm("Do you want to delete " + $scope.selectedNode.name + " ?")) {
            docService.removeNode($scope, $http);
            return true;
        } else {
            return false;
        }
	};

	$scope.saveNode = function(){
		docService.saveNode($scope, $http, function(err, msg){
			console.log(msg);
		});
	};	

	function handleErr(err){
		console.log(err);
	}

});

