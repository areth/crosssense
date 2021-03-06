'use strict';

var express = require('express');
var controller = require('./perception.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.add);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
