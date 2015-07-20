'use strict';

angular.module('profileKingApp')
  .directive('booleanSetting', function () {
    return {
    	scope:{
    		ngModel: '=',
    		options: '=',
    		title: '@'
    	},
		templateUrl: 'app/profileItems/booleanSetting/booleanSetting.html',
		restrict: 'EA',
		link: function (scope, element, attrs) {
		}
    };
  });