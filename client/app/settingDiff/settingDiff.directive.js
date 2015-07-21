'use strict';

angular.module('profileKingApp')
  .directive('settingDiff', function () {
    return {
      templateUrl: 'app/settingDiff/settingDiff.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });