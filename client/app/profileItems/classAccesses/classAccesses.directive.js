'use strict';

angular.module('profileKingApp')
  .directive('classAccesses', function () {
    return {
    	scope:{
    		ngModel: '='
    	},
		templateUrl: 'app/profileItems/classAccesses/classAccesses.html',
		restrict: 'EA',
		link: function (scope, element, attrs) {
			
      	}
    };
  });