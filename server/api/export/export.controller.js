'use strict';

var _ = require('lodash');
var xml2js = require('xml2js');
var fs = require('fs');

// Get list of exports
exports.index = function(req, res) {
  res.json([]);
};
var spacer = '    ';
//var spaces = 0;
var toXML = function(name, value, spcs) {
  var spaces = spcs || '';
  var isObject, isString;
  if (_.isObject(name)) {
    value = name;
    name = null;
  }
  if (_.isArray(value)) {
    return _.map(value, function(v) { return toXML(name, v, spaces+spacer); }).join('') ;
  } else {
    var attrs = [];
    var elems = [];
    if (_.isObject(value)) {
      isObject = true;
      for (var k in value) {
        var v = value[k];
        if (k[0] === '@') {
          k = k.substring(1);
          attrs.push(k + '="' + v + '"');
        } else {
          elems.push(toXML(k, v, spaces));
        }
      }
      value = elems.join('') + '\n';
    } else {
      isString = true;
      value = String(value);
    }

    var startTag = name ? spaces+ '<' + name + (attrs.length > 0 ? ' ' + attrs.join(' ') : '') + '>' : '';
    var endTag = name ? '</' + name + '>' : '';
    var startTag = '\n'+ (isString ? spaces+startTag :  startTag);
    var endTag = isObject ? spaces+endTag : endTag;
    //spaces = spaces.substring(2);
    return  startTag + value + endTag;
  }
}
exports.download = function(req, res){
    var xml = toXML(req.body);

	res.setHeader('Content-disposition', 'attachment; filename=profile.xml');
	res.setHeader('Content-type', 'text/xml');

  	res.send(xml);
}
