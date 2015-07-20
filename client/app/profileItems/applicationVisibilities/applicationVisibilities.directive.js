'use strict';

angular.module('profileKingApp')
  .directive('applicationVisibilities', function (lodash) {
    return {
    	scope: {
    		ngModel: '='
    	},
  		templateUrl: 'app/profileItems/applicationVisibilities/applicationVisibilities.html',
  		restrict: 'EA',
  		link: function (scope, element, attrs) {

  			scope.$watch('ngModel', function(values, old){
          if(values && !old){
            angular.forEach(values, function(value){
              scope.defaultApp = value['default'] ? value.application : scope.defaultApp;
            });
          }
       
  			});
  			
      }
    };
  });