'use strict';

var _ = require('lodash');
var request = require('request');
require('request').debug = true;
exports.proxy = function (req, res) {
    var body = req.body;
    var contentType = "application/x-www-form-urlencoded";
    var sfEndpoint = req.headers["salesforceproxy-endpoint"];
    var soap;
    var options = {
        url: sfEndpoint || "https://login.salesforce.com//services/oauth2/token",
        method: req.method,
        headers: {"Content-Type": contentType,
            "Authorization": req.headers["authorization"] || req.headers['x-authorization'],
            "X-User-Agent": req.headers["x-user-agent"]}
    }
    if (body) {
        //if doing oauth, then send body as form-urlencoded
        if (sfEndpoint && sfEndpoint.indexOf('oauth2') > 0) {
            options.body = getAsUriParameters(body);
        } 
        else if(sfEndpoint && sfEndpoint.indexOf('/services/Soap')>0){
            options.headers['Content-Type'] = 'text/xml';
            options.headers['SOAPAction'] = '""';
            options.body = req.rawBody;
            soap = true;

        }
        else {//for everything else, it's json
            options.headers['Content-Type'] = "application/json";
            options.body = JSON.stringify(body);
        }
    }

    if ((!body || JSON.stringify(body) === "\"{}\"") && (typeof sfEndpoint != "string")) {
        return res.send('Request successful (but nothing to proxy to SF)');
    }

    request(options).pipe(res);
    //soap ? request(options).pipe(res) : res.send(xml);

};
function log(req) {
    console.log("req.headers[\"authorization\"] = " + req.headers["authorization"]);
    console.log("req.headers[\"x-authorization\"] = " + req.headers["x-authorization"]);
    console.log("req.headers[\"salesforceproxy-endpoint\"] = " + req.headers["salesforceproxy-endpoint"]);
    console.log('req.method = ' + req.method);
    console.log('req.body ' + JSON.stringify(req.body));
}

function getAsUriParameters(data) {
    var url = '';
    for (var prop in data) {
        url += encodeURIComponent(prop) + '=' +
            encodeURIComponent(data[prop]) + '&';
    }
    var result = url.substring(0, url.length - 1);
    console.log(result);
    return result;
}