'use strict';

angular.module('myDocumentManagerApp')
  .controller('MainCtrl', function ($scope, $http, socket, docService) {

    $scope.newDirectory = '';
  	$scope.docRoots = [];
    
    $http.get('/api/docs').success(function(docRoots) {
      socket.syncUpdates('docs', docRoots);
      $scope.docRoots = docRoots;
    });

	  $scope.addNewRoot = function(){
	      docService.addNewRoot($http, $scope.newRootName);
	  };

  	$scope.deleteRoot = function(root) {
        if (confirm("Do you want to delete " + root.label + " ?")) {
          docService.deleteRoot($http, root);
            return true;
        } else {
            return false;
        }
  	};

});