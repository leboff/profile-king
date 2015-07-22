'use strict';

var express = require('express');
var controller = require('./export.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.download);

module.exports = router;