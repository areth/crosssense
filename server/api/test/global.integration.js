'use strict';

import app from '../..';
import User from '../user/user.model';
import Receptor from '../receptor/receptor.model';
import * as testGlobal from './global';
import request from 'supertest';

// Clear users before testing
before(function(done) {
  User.remove().then(function() {
      var user = new User(testGlobal.user);
      return user.save();
    })
    .then(function(user) {
      // user._id is hidden
      //testGlobal.user._id = user._id;
      testGlobal.user.receptor = user.receptor;
      request(app)
        .post('/auth/local')
        .send(testGlobal.user)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          testGlobal.token = res.body.token;
          done();
        });
    });
});

// Clear users after testing
after(function(done) {
  User.remove().exec();
  Receptor.remove().exec();
  done();
});