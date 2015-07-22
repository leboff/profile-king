'use strict';

angular.module('profileKingApp')
  .factory('profiles', function ($q,lodash, profileList) {
  	var _ = lodash;


  	var profile = function(_client, profile){
  		var _self = profile,
  			_client = _client;

  		_self.get = function(){
  			return $q.when(_client.connection.metadata.read('Profile', [_self.fullName])
  						.then(function(prof){
  							profileList.add(prof);
  						}));
  		}
      _self.changed = function(key, setting){
        console.log(key, setting);
        profileList.setDiff(key, setting);
      }
  		return _self;
  	}
    var profiles = function(client){
    	var _self = [];
    	var _client = client;

    	_self.list = function(){
    		return $q.when(_client.connection.metadata.list([{type: 'Profile'}], function(err, res){
    			_.each(res, function(prof){
    				_self.push(new profile(_client, prof));
    			});
    		}));
    	}


    	return _self;
    }

    return profiles;
  });
    	
    	
