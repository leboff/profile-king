'use strict';

angular.module('profileKingApp')
  .directive('orgList', function () {
    return {
      templateUrl: 'app/orgList/orgList.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });