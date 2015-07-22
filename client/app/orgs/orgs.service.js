'use strict';

angular.module('profileKingApp')
  .service('orgs', function ($q, ngForce, profiles) {

    var org = function(prefix){
        var _self = this,
            _client = new ngForce(prefix);

        this.identity = null;

        this.login = function(){
            var deferred = $q.defer();

            _client.login(function(loginerr, userinfo){
                _client.connection.identity()
                    .then(function(identity){
                        console.log(identity);
                        _self.identity = identity;
                        deferred.resolve(_self);
                    });
            });

            return deferred.promise;
       }
       this.profiles = new profiles(_client);

    }

    this.orgs = [];

    this.get = function(prefix){
        var o = new org(prefix);
        this.orgs.push(o);
    	return o;
    }
    this.all = function(){
        return orgs;
    }

   
  });
