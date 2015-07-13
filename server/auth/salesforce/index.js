'use strict';

var express = require('express');
var controller = require('./salesforce.controller');
var passport = require('passport');
var ForceDotComStrategy = require('passport-forcedotcom').Strategy;

var router = express.Router();

router.all('/?*', controller.proxy);



module.exports = router;