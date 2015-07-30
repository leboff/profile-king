'use strict';

angular.module('profileKingApp')
  .factory('profile', function ($rootScope, $q, lodash, profileSettings, profileList) {
    var _ = lodash;
  	return function(_client, profile){
  		var _self = profile,
  			_client = _client;

      if(_.isString(_client)){
          xml2js.parseString(_client, {explicitArray: false}, function(err, profileJSON){
            console.log(profileJSON);
            _client = null;
            _self = profileJSON.Profile;
            profileList.add(_self);
          });
        
      }

      _self.add = function(typ, label){
        var opts = profileSettings[typ];
        var perms = ['read', 'edit', 'create', 'del', 'select', 'defaultField'];
        var newOption = {};
        if(opts){
          newOption[opts.setting.field] = label;
          _.forEach(perms, function(perm){
            if(opts[perm]){
              newOption[perm] = false;
            }
          });
        }
        _self[typ].push(newOption);
      }
  		_self.get = function(){
  			return $q.when(_client.connection.metadata.read('Profile', [_self.fullName])
  						.then(function(prof){
                _.extend(_self, prof);
  							profileList.add(_self);
  						}));
  		}
      _self.changed = function(key, setting){
        console.log(key, setting);
        profileList.setDiff(key, setting);
      }
     
  		return _self;
  	}
  });
    	
    	
