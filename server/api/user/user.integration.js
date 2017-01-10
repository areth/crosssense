'use strict';

import app from '../..';
import User from './user.model';
import Receptor from '../receptor/receptor.model';
import request from 'supertest';
import * as testGlobal from '../test/global';

describe('User API:', function() {
  describe('GET /api/users/me', function() {
    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', `Bearer ${testGlobal.token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.email).to.equal(testGlobal.user.email);
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });

  var newUser = {
    name: "ExampleUser",
    email: "email@example.com",
    password: "password"
  };

  describe('POST /api/users', function() {
    var createResult;
    before(function(done) {
      request(app)
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          createResult = res.body;
          done();
        });
    });

    it('should respond with newly created user token', function() {
      expect(createResult.token).to.be.a('string');
    });

    it('new receptor should be created', function(done) {
      var userId;
      User.findOne({name: newUser.name}).exec()
        .then(function(user){
          userId = user._id;
          return Receptor.findById(user.receptor).exec();
        })
        .then(function(receptor){
          expect(receptor).to.have.property('user').to.equal(userId);
          done();
        })
        .catch(function(err){
          done(err);
        });
    });
  });
});
