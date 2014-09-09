'use strict';


angular.module('myDocumentManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('docs', {
          url: '/docs',
          templateUrl: 'app/docs/docs.html',
          controller: 'DocsCtrl'
      })
      .state('docsRoot', {
          url: '/docs/:docRoot',
          templateUrl: 'app/docs/docs.html',
          controller: 'DocsCtrl'
      });
});
