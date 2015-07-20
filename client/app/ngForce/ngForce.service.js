'use strict';

angular.module('profileKingApp')
  .factory('ngForce', ['$rootScope', '$q', '$cookies', function ($rootScope, $q, $cookies) {
    var jsForceClient = function(prefix){
      var client = new jsforce.browser.Client(prefix);
      var ident = {}, profs;

      client.init({
        clientId: '3MVG9xOCXq4ID1uFfHAXTCko8e9g26OglamEM2GjnNcJk9L8mqg8UYPY9dOdhpuuqztD_7rguudLQiz3IScPb',
        redirectUri: 'http://localhost:9000/callback',
        loginUrl : 'https://login.salesforce.com',
        proxyUrl: '/proxy'
      });

      var login = function(){
        var loginQ = $q.defer();
         client.login(function(loginErr, userinfo){
            if(loginErr) loginQ.reject(loginErr);
            loginQ.resolve();
          });
          return loginQ.promise;
      }
      var identify = function(){
          var identQ = $q.defer();
          client.connection.identity(function(identErr, identRes){
              if(identErr) identQ.reject(identErr);
              ident = identRes;
              identQ.resolve();
          });
          return identQ.promise;
      }
      var profiles = function(){
          var profQ = $q.defer();
          client.connection.metadata.list([{type: 'Profile'}], function(profErr, res){
              if(profErr) return profQ.reject(profErr);
              profs = res;
              profQ.resolve();
          });
          return profQ.promise;
      }
      var ngClient =  {
        name: client._prefix,
        client: client,
        profiles: function(){
          return profs;
        },
        login: function(){
          return login();
        },
        identify: function(){
          return identify();
        },
        loginAndIdentify: function(){
          return login().then(identify);
        },
        getProfiles: function(){
          return profiles();
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
        identity: function(){
          return ident;
        },
        isLoggedIn: function(){
          return client.isLoggedIn();
        }
      }
      return $q(function(resolve, reject){
        if(client.isLoggedIn()){
          identify().then(function(){
            console.log('sending back my love');
            resolve(ngClient);
          });
        }
        else{
          resolve(ngClient)
        }
      });
    }

    // Public API here
    return{
      existing: function(){

        var existing = [];

        var cookies = $cookies.getAll();
        angular.forEach(cookies, function(cookie, key){
           var regexp = new RegExp('^'+'(jsforce\\d+)'+'_loggedin$');
           var match = key.match(regexp);
           if(match && match[0] && match[1] && cookie === 'true'){
              var force = new jsForceClient(match[1]);
              existing.push(force);
           }
        });

        
         return $q.all(existing);
       
      },
      new: function(){
        return new jsForceClient();
      }
    } 
  }]);
