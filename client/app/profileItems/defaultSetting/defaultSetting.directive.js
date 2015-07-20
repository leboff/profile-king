'use strict';

angular.module('profileKingApp')
  .directive('defaultSetting', function (lodash) {
    return {
    	scope:{
    		ngModel: '=',
    		options: '=',
    		title: '@'
    	},
  		templateUrl: 'app/profileItems/defaultSetting/defaultSetting.html',
  		restrict: 'EA',
  		link: function (scope, element, attrs) {

  			scope.$watch('ngModel', function(values, old){
	          if(values && !old){
	            angular.forEach(values, function(value){
	              scope.defaultValue = value[scope.options.defaultField.field] == 'true' ? value[scope.options.label.field] : scope.defaultValue;
	            });
	          }
       
  			});
  			
      }
    };
  });