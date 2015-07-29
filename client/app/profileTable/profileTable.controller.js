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
        profile['@xmlns'] = 'http://soap.sforce.com/2006/04/metadata';

   	    $http.post('/api/exports', {Profile: profile})
    		.success(function(data, status, headers){
    		    $scope.profileData = 'data:text/xml;base64,'+$base64.encode(data);
    			$scope.dcolor = 'greenyellow';
    		});

    }
  });
