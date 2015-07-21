'use strict';

angular.module('profileKingApp')
  .factory('diff', function (lodash, profileSettings) {
    var _diffs = [], _origin = {};

    var diff = function(setting){
        console.log(_origin);
    }
    // Public API here
    return {
    	setOrigin: function(value){
    		_.origin = value;
    	},
    	all: function(){
    		return _all;
    	},
		diff: function(setting){
			diff(setting);
		}
    };
  });
