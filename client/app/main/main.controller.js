'use strict';

angular.module('profileKingApp')
  .controller('MainCtrl', function ($scope, $cookies, ngForce, orgs, profileList) {
    $scope.orgs = [];

    $scope.profiles = profileList;

    var cb = new ngForce();


    var cookies = $cookies.getAll();
    angular.forEach(cookies, function(cookie, key){
       var regexp = new RegExp('^'+'(jsforce\\d+)'+'_loggedin$');
       var match = key.match(regexp);
       if(match && match[0] && match[1] && cookie === 'true'){
          var org = orgs.get(match[1]);
          if(org.loggedIn){
              org.identify().then(function(){
                  $scope.orgs.push(org);
              });
          }
       }
    });

    $scope.addOrg = function(){
        // var org = orgs.get('jsforce3');
        // org.identity = {};
        // org.identity.username = 'test';
        // $scope.orgs.push(org);
        var org = orgs.get();
        org.login()
            .then(function(){
                console.log(org);
                $scope.orgs.push(org);
            });
    }
    $scope.logOrg = function(){
        console.log($scope.orgs);
        console.log($scope.profiles.getProfiles());
        console.log($scope.profiles.getSettings());
    }

  });
    // var force, _ = lodash;

    // $scope.isArray = angular.isArray;

    // $scope.isCollapsed = true;
    // $scope.profiles = [];
    // $scope.orgs = [];

    // $scope.profiles = [];
    // $scope.side = 'lhs';

    // $scope.logOrg = function(){
    //     console.log($scope.orgs);
    // }



    // var addForce = function(){
    //     ngForce.new().then(function(client){
    //         force = client;
    //     });
    // }

    // $scope.addOrg = function(){
    //     force.loginAndIdentify().then(function(){
    //         $scope.orgs.push(force);
    //        addForce();
    //     });
    // }


    // $scope.toggle = function(org){
    //     console.log(org);
    //     $scope.isCollapsed = !$scope.isCollapsed;
    // }

    // $scope.setProfile = function(org, prof, selectedSide){
    //     org.busy = true;
    //     prof.$org = org.$loki;


    //     org.getProfile(prof.fullName).then(function(profile){
    //         org.busy = false;
    //          lokidb.insert('profiles', profile);
    //         _.forEach(profileSettings, function(props, setting){
    //             var settings = profile[setting];
    //             if(_.isArray(settings)){
    //                  _.forEach(settings, function(value, idx){
    //                     value.$profile = profile.$loki;
    //                     value.settingType = setting;
    //                     lokidb.insert('settings', value);
    //                 });
    //             }
    //             else if(_.isObject(settings)){
    //                 settings.$profile = profile.$loki;
    //                 settings.settingType = setting;
    //                 lokidb.insert('settings', settings);
    //             }

    //         });
    //         $scope.profiles.push(profile);
    //     });
    // }


    // ngForce.existing().then(function(orgs){
    //     angular.forEach(orgs, function(org){

    //         if(org.isLoggedIn()){
    //             org.busy = true
    //             org.identify().then(org.getProfiles).then(function(){
    //                 org.full_identity = org.identity();
    //                 org.busy = false;
    //             });
    //             lokidb.insert('orgs', org);
    //             $scope.orgs.push(org);

    //         }

    //     });
    // });
    // addForce();
