'use strict';

angular.module('myDocumentManagerApp')
  .controller('NavbarCtrl', function ($scope, $http, $location, socket, docService) {

    $scope.isCollapsed = true;
    $scope.isActive = function(route) {
      return '/docs/' + route === $location.path();
    };
    
    //////////////////////////////////////////////

    $scope.docRoots = [];
    docService.loadDocRoots($http, socket, function(err, docRoots){
    	$scope.docRoots = docRoots;
    });

  });