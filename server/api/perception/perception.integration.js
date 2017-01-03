'use strict';

import app from '../..';
import request from 'supertest';
import testGlobal from '../test/global';
import Perception from './perception.model';
import Signal from '../signal/signal.model';

var newPerception;

describe('Perception API:', function() {
  after(function(){
    Perception.remove();
  });

  describe('GET /api/perceptions', function() {
    var perceptions;

    beforeEach(function(done) {
      request(app)
        .get('/api/perceptions')
        .set('authorization', `Bearer ${testGlobal.token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          perceptions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(perceptions).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/perceptions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/perceptions')
        .send({
          signal: 'SignalIdPlaceholder',
          value: 0.89
        })
        .set('authorization', `Bearer ${testGlobal.token}`)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPerception = res.body;
          done();
        });
    });

    it('should respond with the newly created perception', function() {
      expect(newPerception.signal).to.equal('SignalIdPlaceholder');
      expect(newPerception.value).to.equal(0.89);
      // there is only one signal, so it should be the maximum
      expect(newPerception.valueScaled).to.equal(Signal.maxValueScale);
    });
  });

  describe('DELETE /api/perceptions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/perceptions/${newPerception._id}`)
        .set('authorization', `Bearer ${testGlobal.token}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when perception does not exist', function(done) {
      request(app)
        .delete(`/api/perceptions/${newPerception._id}`)
        .set('authorization', `Bearer ${testGlobal.token}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
