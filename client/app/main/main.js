'use strict';

angular.module('profileKingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/callback', {
      	templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });