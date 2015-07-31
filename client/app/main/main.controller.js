'use strict';

angular.module('profileKingApp')
    .controller('MainCtrl', function ($scope, $cookies, $http, $base64,$timeout, lodash, profile, profileSettings, ngForce) {
        var _ = lodash;
        var profiles;
        var ngforce = new ngForce();
        $scope.permissions = {};
        $scope.downloads = {};
        var settings = $scope.settings = profileSettings;
        profile.all().then(function(profs){
            profiles = profs;
            console.log(profs);
            setProfiles(profs);
        });

        $scope.getProfiles = function(){
            var fullNames = ['TEM Manager'];
            ngforce.login(function(){
                ngforce.connection.metadata.read('Profile', fullNames)
                .then(function(profiles){
                    if(_.isArray(profiles)) 
                        _.forEach(profiles, profile.write);
                    else
                        profile.write(profiles);
                    
                });
            })
                
        }

        $scope.log = function(data){
            console.log(data);
        }

        $scope.field = {};
        $scope.writeAll = function(){
            _.forEach(profiles, profile.write);
        }
        $scope.remove = function(profile){

            // _.remove($scope.profiles, function(prof){
            //     return prof.fullName === profile.fullName;
            // });
            console.log(profiles);
        }


        $scope.add = function(){
            _.forEach(profiles, function(profile){
                var setting = settings[$scope.field.typ];
                var perm = {};
                if(setting.create) perm[setting.create.field] = false;
                if(setting.read) perm[setting.read.field] = false;
                if(setting.edit) perm[setting.edit.field] = false;
                if(setting.del) perm[setting.del.field] = false;
                if(setting.select) perm[setting.select.field] = '';
                perm[setting.setting.field] = $scope.field.name;
               var idx = _.sortedIndex(profile[$scope.field.typ], perm, function(profile) {
                  return profile[setting.setting.field];
                });

                profile[$scope.field.typ].splice(idx, 0, perm);
            });
            setProfiles(profiles);
        }

        var setProfiles = function(profs){
            $scope.profiles = _.map(profs, function(profile){
                return _.transform(profile, function(res, n, key){
                    if(_.isArray(n)){
                       var indexed = _.indexBy(n, settings[key].setting.field)
                        $scope.permissions[key] = _.union($scope.permissions[key], _.keys(indexed)); 
                        res[key]= indexed;
                    }
                    else{
                        res[key] = n;
                    }
                     
                });
            });


            


            
        }

    });
