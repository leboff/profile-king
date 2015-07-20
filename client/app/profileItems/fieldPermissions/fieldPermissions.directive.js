'use strict';

angular.module('profileKingApp')
  .directive('fieldPermissions', function () {
    return {
    	scope:{
    		ngModel: '='
    	},
		templateUrl: 'app/profileItems/fieldPermissions/fieldPermissions.html',
		restrict: 'EA',
		link: function (scope, element, attrs) {
			
      	}
    };
  });