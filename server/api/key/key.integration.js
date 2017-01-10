'use strict';

import app from '../..';
import request from 'supertest';
import * as testGlobal from '../test/global';
import Key from './key.model';

var newKey;

describe('Key API:', function() {
  after(function(){
    return Key.remove();
  });

  describe('GET /api/keys', function() {
    var key;

    beforeEach(function(done) {
      request(app)
        .get('/api/keys')
        .set('authorization', `Bearer ${testGlobal.token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          key = res.body;
          done();
        });
    });

    it('should respond with a key', function() {
      expect(key).to.have.property('receptor').to.equal(testGlobal.user.receptor);
      expect(key).to.have.property('key').to.be.a('string');
    });
  });

  describe('POST /api/keys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/keys')
        .set('authorization', `Bearer ${testGlobal.token}`)
        .send({
          key: 'SomeSuperStrongKey'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newKey = res.body;
          done();
        });
    });

    it('should respond with the updated key', function() {
      expect(newKey.key).to.equal('SomeSuperStrongKey');
      expect(newKey.receptor).to.equal(testGlobal.user.receptor);
    });
  });
});
