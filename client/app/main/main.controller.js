'use strict';

angular.module('profileKingApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, ngForce, profileColumns, $q) {

    $scope.isArray = angular.isArray;
    
    $scope.profiles = [];
    $scope.orgs = [];

    //initialize one master
    var force = new ngForce();

    $scope.addOrg = function(){
        var org = new ngForce();
        org.login().then(function(){
            console.log(org.profiles());
            $scope.orgs.push(org);
        });

        
    }

    $scope.addProfile = function(org, profile){
        org.getProfile(profile.fullName).then(addProfile);
    }
    
 
    var addProfile = function(data){
        var profile = {};
        console.log(data);
        profile.applicationOptions = {
            data: data.applicationVisibilities,
            columnDefs: profileColumns.getColumnDef('applicationVisibilities'),
            onRegisterApi: function(gridApi){
                console.log(gridApi);
            }
        };
        profile.classOptions = {
            data: data.classAccesses,
            columnDefs: profileColumns.getColumnDef('classAccesses')
        };

        $scope.profiles.push(profile);
    }

    

  });
