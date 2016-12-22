'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('crosssenseApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
