'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('crosssenseApp.login', [])
  .controller('LoginController', LoginController)
  .name;
