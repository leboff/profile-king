'use strict';

angular.module('profileKingApp')
  .factory('profile', function ($q, $http, lodash, api) {
    var _ = lodash;
    
    var write = function(profile){
      var deferred = $q.defer();
        $http.post(api.profiles, profile)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data){
            deferred.reject(data);
          });

        return deferred.promise;
    }

    var all = function(){
      var deferred = $q.defer();
        $http.get(api.profiles)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(data){
            deferred.reject(data);
          });

        return deferred.promise;
    }
    return {
      all: all,
      write: write
    }
  	
  });
    	
    	
