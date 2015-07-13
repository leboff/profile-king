'use strict';

angular.module('profileKingApp')
  .factory('ngForce', ['$q', function ($q) {
    var jsForceClient = function(){
      var client = new jsforce.browser.Client();
      var ident = {}, profs = [];
      client.init({
        clientId: '3MVG9xOCXq4ID1uFfHAXTCko8e9g26OglamEM2GjnNcJk9L8mqg8UYPY9dOdhpuuqztD_7rguudLQiz3IScPb',
        redirectUri: 'http://localhost:9000/callback',
        proxyUrl: '/proxy'
      });
      
      return {
        login: function(){
          var loginQ = $q.defer();
          var identQ = $q.defer();
          var profQ = $q.defer();

          var promises = [loginQ.promise, identQ.promise, profQ.promise];

          client.login(function(loginErr, userinfo){
            if(loginErr) loginQ.reject(loginErr);
            loginQ.resolve();

            client.connection.identity(function(identErr, identRes){
              if(identErr) identQ.reject(identErr);

              ident = identRes;
              identQ.resolve();
            });

            client.connection.metadata.list([{type: 'Profile'}], function(profErr, res){
              if(profErr) return profQ.reject(profErr);
              console.log(res);
              profs = res;
              profQ.resolve();
            });
          });

          return $q.all(promises);
        },
        query: function(query){
          var deferred = $q.defer();
          client.connection.query(query, function(err, res){
            if(err) return deferred.reject(err);
            deferred.resolve(res);
          });
          return deferred.promise;
          
        },
        getProfile: function(name){
          var deferred = $q.defer();
          client.connection.metadata.read('Profile', [name], function(err, metadata){
            if(err) return deferred.reject(err);
            deferred.resolve(metadata);
          });
          return deferred.promise;
        },
        getUsername: function(){
          var deferred = $q.defer();
          client.connection.identity(function(err, res){
            if(err) return deferred.reject(err);
            deferred.resolve(res);
          });
          return deferred.promise;
        },
        profiles: function(){
          return profs;
          
        },
        identity: function(){
          return ident;
        }
      }
    }

    // Public API here
    return function(){
    	return new jsForceClient();
    }
  }]);
