angular.module('myDocumentManagerApp')
.controller('DocsCtrl', function ($scope, $http, $stateParams, $modal, docService, tools) {


	///////////// tools ///////////////////////

	// default editor is htmlViewer
	$scope.isEditorOn = false;

	tools.init($scope, editor, htmlViewer);

	$scope.changeCurrentEditor = function(){
		$scope.isEditorOn = !$scope.isEditorOn;
		tools.changeCurrentEditor($scope);
	};

	$scope.addTagsWithoutClass = function(tag){
		tools.addTagsWithoutClass($scope, tag);
	};

	$scope.setMark = function(color){
		tools.addTagsWithClass($scope, $scope.tagsWithClass[0], color);	
	};
	
	$scope.setBlock = function(color){
		tools.addTagsWithClass($scope, $scope.tagsWithClass[1], color);	
	};

	$scope.addSymbol = function(s){
		editor.insert(' ' + s + ' ');
	};

	$scope.reset = function(){
		tools.reset($scope);
	}

	
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

				$scope.content = content;
				$scope.HTML_VIEWER.setValue(content);
				$scope.ACE_EDITOR.setValue(content);
			});
		}
    };
   
	$scope.createNode = function(type){
		docService.createNode($scope, $http, type);
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
	



});

