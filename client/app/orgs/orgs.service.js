'use strict';

angular.module('profileKingApp')
  .service('orgs', function ($q, ngForce, profile) {

    var org = function(prefix){
        var _self = this,
            _client = new ngForce(prefix);

        this.loggedIn = _client.isLoggedIn();
        console.log(prefix, _client);
        this.identity = null;

        this.identify = function(){
            var deferred = $q.defer();

            _client.connection.identity()
                .then(function(identity){
                    console.log(identity);
                    _self.identity = identity;
                    deferred.resolve(_self);
                });

            return deferred.promise;
        }
        this.login = function(){
            var deferred = $q.defer();
            if(this.loggedIn){
                return this.identify();
            }
            else{
                _client.login(function(loginerr, userinfo){
                    this.loggedIn = true;
                    this.identify().then(deferred.resolve);
                });
            }
            return deferred.promise;
       }
       this.profiles = function(){
            var _self = [];

            _self.list = function(){
                return $q.when(_client.connection.metadata.list([{type: 'Profile'}], function(err, res){
                    _.each(res, function(prof){
                        _self.push(new profile(_client, prof));
                    });
                }));
            }

            return _self;
       }

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
