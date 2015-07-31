'use strict';

var _ = require('lodash');
var xml2js = require('xml2js');
var fs = require('fs');

// Get list of exports
exports.index = function(req, res) {
  res.json([]);
};

exports.download = function(req, res){
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(req.body);
	res.setHeader('Content-disposition', 'attachment; filename=profile.xml');
	res.setHeader('Content-type', 'text/xml');
  res.send(xml);
}
