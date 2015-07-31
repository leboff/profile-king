'use strict';

var _ = require('lodash');
var fs = require('fs');
var Promise = require('promise');
var xml2js = require('xml2js').parseString;
var config = require('../../config/environment');
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// Get list of profiles
exports.index = function(req, res) {
	var readdir = Promise.denodeify(fs.readdir);
	var readFile = Promise.denodeify(fs.readFile);
	var parse = Promise.denodeify(xml2js);
	readdir(config.profilesDir)
		.then(function(files){
			var promises = [];
			_.forEach(files, function(file){
				if(endsWith(file, '.profile'))
					promises.push(readFile(config.profilesDir+'/'+file,{encoding: 'UTF-8'}));
			});
			return Promise.all(promises);
		})
		.then(function(profiles){
			var promises = [];
			_.forEach(profiles, function(profile){
				promises.push(parse(profile, {explicitArray : false}));
			});
			return Promise.all(promises);
		})
		.then(function(profiles){
			var results = [];
			_.forEach(profiles, function(profile){
				results.push(profile.Profile);
			});
			res.json(results);
		})
		.catch(function(rej){
			res.json(rej);
		});
  	
};
