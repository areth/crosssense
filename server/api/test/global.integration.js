'use strict';

import app from '../..';
import User from '../user/user.model';
import testGlobal from './global';
import request from 'supertest';

// Clear users before testing
before(function(done) {
  User.remove().then(function() {
      var user = new User(testGlobal.user);
      return user.save();
      //testMain.user._id = user._id;
    })
    .then(function(user) {
      testGlobal.user._id = user._id;
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
    });;
});

// Clear users after testing
after(function() {
  return User.remove();
});