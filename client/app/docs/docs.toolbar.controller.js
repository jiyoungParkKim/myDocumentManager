angular.module('myDocumentManagerApp')
.controller('ToolbarCtrl', function ($scope, $http, $stateParams, $modal, docService, tools) {

	$scope.loadMe = function(scope){
		console.log(scope);
		$scope = scope;
		tools.init(scope, editor, htmlViewer);

			// default editor is htmlViewer
		$scope.isEditorOn = false;

		//tools.init($scope, editor, htmlViewer);

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
			editor.insert(s + ' ');
		};

		$scope.addHtmlTags = function(s){
			editor.insert(s);
		};

		$scope.reset = function(){
			tools.reset($scope);
		}

		$scope.toogleTree = function(){
			scope.isTreeOn = !scope.isTreeOn;
		};

		$scope.toogleMenu = function(){
			scope.isMenuOn = !scope.isMenuOn;
		};


	}

});

