'use strict';

angular.module('profileKingApp')
  .service('profileList', function ($http, lodash, profileSettings) {
  	var _ = lodash, 
  		_settings = {},
  		_profiles = {},
      _diff = {},
  		_origin;
    
    var findMissing = function(){
      var profiles = _.keys(_profiles);
        _.forEach(_settings, function(setting){
          _.forEach(setting, function(value){
            _.forEach(profiles, function(profile){
              if(profile != _origin.id){
                if(!value[profile]){
                  _.set(value, profile+'.$diff'+'.missing', true);
                }
              }
            });
          });
        });
    }

    var sync = this.sync = function(){
      var profiles = _.keys(_profiles);
      var perms = ['read', 'edit', 'create', 'del', 'select', 'defaultField'];

        _.forEach(_settings, function(setting, name){
          var opts = profileSettings[name];
          _.forEach(setting, function(value, key){
            _.forEach(profiles, function(profile){
              if(profile != _origin.id){
                var lhs = _.get(_settings[name][key], _origin.id);
                var rhs = value[profile];
                if(lhs && rhs){
                  _.forEach(perms, function(perm){
                  if(opts[perm]){
                      var path = opts[perm].field;
                      if(rhs[path] && rhs[path] != lhs[path]){
                        rhs[path] = lhs[path];
                        rhs.$diff[perm].modified = false;
                      }
                    }
                  });
                }
                
              }
            });
          });
        });
    }

    var setDiff = this.setDiff = function(key, rhs){
      var option = profileSettings[key];
      var settingKey = _.get(rhs, option.setting.field);
      var lhs = _.get(_settings[key][settingKey],  _origin.id);
      var perms = ['read', 'edit', 'create', 'del', 'select', 'defaultField'];
      if(lhs){
         _.forEach(perms, function(perm){
          if(option[perm]){
              var path = option[perm].field;
              if(lhs[path] != rhs[path]){
                _.set(rhs, '$diff['+perm+'].modified', true);
              }
              else{
                _.set(rhs, '$diff['+perm+'].modified', false);
              }
            }
        });
      }
    }
    this.add = function(profile){
  		if(_.isEmpty(_profiles)) _origin = profile;

  		profile.id = _.uniqueId('profile_');

  		_.forEach(profileSettings, function(option, key){
  			if(_.isArray(profile[key])){
          var settingGroup = profile[key];
          _.forEach(settingGroup, function(setting){
            var settingKey = _.get(setting, option.setting.field);
            if(!_settings[key]) _settings[key] = {};
            if(!_settings[key][settingKey]) _settings[key][settingKey] = {};
            _.set(_settings[key][settingKey], profile.id, setting);
            setDiff(key, setting);
          });
        }
  		});

  		_profiles[profile.id] = profile;

      findMissing();

  	}
    var clean = function(prof){
      var profile = _.clone(prof);
      _.forEach(profile, function(setting, key){
        if(_.startsWith(key, '\$') || key == 'id') delete profile[key];
        else{
          _.forEach(setting, function(value, valueKey){
              if(_.startsWith(valueKey, '\$')) delete profile[key][valueKey];
              else{
                _.forEach(value, function(param, paramKey){
                  if(_.startsWith(paramKey, '\$')) delete profile[key][valueKey][paramKey];
                })
              }
          })
        }
      });
      return profile;
    }

    this.get = function(key){

      return clean(_profiles[key]);
    }

    this.diff = function(){
      return _diff;
    }

  	this.getProfiles = function(){
  		return _profiles;
  	}

  	this.getSettings = function(){
  		return _settings;
  	}
  });
