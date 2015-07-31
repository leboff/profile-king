'use strict';

angular.module('profileKingApp')
  .factory('profile', function ($q, $http, lodash, api) {
    var _ = lodash;
    
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
      all: all
    }
  	
  });
    	
    	
