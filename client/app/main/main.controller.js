'use strict';

angular.module('profileKingApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, ngForce, $q, lodash, profileSettings, lokidb) {
    var force, _ = lodash;

    $scope.isArray = angular.isArray;
        
    $scope.isCollapsed = true;
    $scope.profiles = [];
    $scope.orgs = [];

    $scope.profiles = [];
    $scope.side = 'lhs';

    $scope.logOrg = function(){
        console.log($scope.orgs);
    }
   
    

    var addForce = function(){
        ngForce.new().then(function(client){
            force = client;
        });
    }

    $scope.addOrg = function(){
        force.loginAndIdentify().then(function(){
            $scope.orgs.push(force);
           addForce();
        });
    }

   
    $scope.toggle = function(org){
        console.log(org);
        $scope.isCollapsed = !$scope.isCollapsed;
    }

    $scope.setProfile = function(org, profile, selectedSide){
        org.busy = true;
        org.getProfile(profile.fullName).then(function(profile){
            org.busy = false;
            profile.$org = org.$loki;
            lokidb.insert('profiles', profile);
            _.forEach(profileSettings, function(props, setting){
                var settings = profile[setting];
                if(_.isArray(settings)){
                     _.forEach(settings, function(value, idx){
                        value.$profile = profile.$loki;
                        value.settingType = setting;
                        lokidb.insert('settings', value);
                    });
                }
                else if(_.isObject(settings)){
                    settings.$profile = profile.$loki;
                    settings.settingType = setting;
                    lokidb.insert('settings', settings);
                }
               
            });
            $scope.profiles.push(profile.fullName);
        });
    }
    

    ngForce.existing().then(function(orgs){
        angular.forEach(orgs, function(org){
            
            if(org.isLoggedIn()){
                org.busy = true
                org.getProfiles().then(function(){
                    org.busy = false;
                });
                lokidb.insert('orgs', org);
                $scope.orgs.push(org);

            }
            
        });
    });
    addForce();


  });
