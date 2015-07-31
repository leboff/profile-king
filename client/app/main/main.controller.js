'use strict';

angular.module('profileKingApp')
    .controller('MainCtrl', function ($scope, $cookies, $http, $base64,$timeout, lodash, profile, profileSettings) {
        var _ = lodash;
        var profiles;
        $scope.permissions = {};
        $scope.downloads = {};
        var settings = $scope.settings = profileSettings;
        profile.all().then(function(profs){
            profiles = profs;
            setProfiles(profs);
        });

        $scope.field = {};
        $scope.download = function(profile, idx){
            var prof = _.findWhere(profiles, {fullName: profile.fullName});
            console.log(idx);
            $http.post('/api/exports', {Profile: prof})
                .success(function(data, status, headers){
                    $scope.downloads[profile.fullName] = 'data:text/xml;base64,'+$base64.encode(data);
                    $scope.dcolor = 'greenyellow';
                     $timeout(function() {
                        console.log( angular.element('#'+idx+'-export'));
                        angular.element('#'+idx+'-export').click();
                      }, 1000);
                });

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
                profile[$scope.field.typ].push(perm);
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
