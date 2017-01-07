'use strict';

var express = require('express');
var controller = require('./key.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.set);

module.exports = router;
