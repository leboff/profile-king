'use strict';

var _ = require('lodash');
var fs = require('fs');
var Promise = require('promise');
var xml2js = require('xml2js');
var config = require('../../config/environment');
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function writeOut(dir, profile){
	var builder = new xml2js.Builder();
	if(!_.isString(dir)){
		 profile = dir;
		 dir = '';
	}
 	var xml = builder.buildObject(profile);

 	var path = dir+'\\'+profile.Profile.fullName+'.profile';
 	fs.writeFile(path, xml );
}
exports.write = function(req, res){
	var profile = {Profile: req.body};
	writeOut(config.profilesDir,profile);
 	res.json([profile.Profile.fullName]);
}
// Get list of profiles
exports.index = function(req, res) {
	var readdir = Promise.denodeify(fs.readdir);
	var readFile = Promise.denodeify(fs.readFile);
	var parse = Promise.denodeify(xml2js.parseString);
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
