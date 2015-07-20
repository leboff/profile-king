'use strict';

angular.module('profileKingApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, ngForce, $q, lodash) {
    var force;
    $scope.options = {
        apexClass: {
            label: {
                label: 'Apex Class',
                field: 'apexClass'
            },
            value:{
                label: 'Enabled',
                field: 'enabled'
            }
        },
        pageAccess: {
            label: {
                label: 'Page',
                field: 'apexPage'
            },
            value:{
                label: 'Enabled',
                field: 'enabled'
            }
        },
        userPermission:{
            label: {
                label: 'Permission',
                field: 'name'
            },
            value:{
                label: 'Enabled',
                field: 'enabled'
            }
        },
        applicationVisibility:{
            label:{
                label: 'Application',
                field: 'application'
            }, 
            defaultField: {
                label: 'Default',
                field: 'default'
            },
            value:{
                label: 'Visible',
                field: 'visible'
            }
        },
        recordTypeVisibility:{
            label:{
                label: 'Record Type',
                field: 'recordType'
            }, 
            defaultField: {
                label: 'Default',
                field: 'default'
            },
            value:{
                label: 'Visible',
                field: 'visible'
            }
        }
    };


    $scope.isArray = angular.isArray;
        
    $scope.isCollapsed = true;
    $scope.profiles = [];
    $scope.orgs = [];

    $scope.comparator = {
        lhs:{},
        rhs:{}
    };
    $scope.side = 'lhs';

    $scope.logOrg = function(){
        console.log($scope.orgs);
    }
   

    var addForce = function(){
        ngForce.new().then(function(client){
            force = client;
        });
    }
    var setDefaultApp = function(profile, side){
        var def = _.findWhere(profile.applicationVisibilities,{'default': 'true'} );
        $scope.comparator[side].defaultApp = def.application;
    }

    $scope.addOrg = function(){
        force.loginAndIdentify().then(function(){
            $scope.orgs.push(force);
           addForce();
        });
    }

    $scope.addProfile = function(org, profile){
        
    }
    $scope.toggle = function(org){
        console.log(org);
        $scope.isCollapsed = !$scope.isCollapsed;
    }

    $scope.setProfile = function(org, profile, selectedSide){
        selectedSide = $scope.comparator.lhs.profile ? 'rhs' : 'lhs';
        org.busy = true;
        org.getProfile(profile.fullName).then(function(profile){
            setDefaultApp(profile, selectedSide);
            console.log(profile);
            org.busy = false;
            $scope.comparator[selectedSide].org = org;
            $scope.comparator[selectedSide].profile = profile;
        });
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

        $scope.profiles.push(data);
    }

    ngForce.existing().then(function(orgs){
        angular.forEach(orgs, function(org){
            console.log(org.isLoggedIn());
            if(org.isLoggedIn()){
                org.busy = true
                console.log(org);
                org.getProfiles().then(function(){
                    org.busy = false;
                });
                $scope.orgs.push(org);
            }
            
        });
    });
    addForce();


  });
