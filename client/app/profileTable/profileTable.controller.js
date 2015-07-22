'use strict';

angular.module('profileKingApp')
  .controller('ProfileTableCtrl', function ($scope, $http, $base64, profileList, profileSettings) {
    $scope.profiles = profileList;
    $scope.opts = profileSettings;
    $scope.dcolor = 'white';
    $scope.show = {};
    $scope.showProfiles = function(){
    	console.log($scope.profiles.getProfiles());
    	console.log($scope.profiles.getSettings());
    }

    $scope.download = function(key){
    	var profile = profileList.get(key);
    	$http.post('/api/exports', {Profile: {'@xmlns': 'test', profile} })
    		.success(function(data, status, headers){
    			//var blob = new Blob([ data ], { type : 'text/xml' });
    			//$scope.profileData = (window.URL || window.webkitURL).createObjectURL( blob );
    		    $scope.profileData = 'data:text/xml;base64,'+$base64.encode(data);
    			$scope.dcolor = 'greenyellow';
    		});
    	
    }
  });
