'use strict';

import app from '../..';
import request from 'supertest';
import * as testGlobal from '../test/global';
import Perception from './perception.model';
import Signal from '../signal/signal.model';
import uuidV1 from 'uuid/v1';
import Promise from 'bluebird';

var newPerception;

describe('Perception API:', function() {
  after(function(done){
    Perception.remove().exec();
    Signal.remove().exec();
    done();
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
      expect(newPerception).to.not.have.any.keys('_signal', '_valueScaled');
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

  describe('Create multiple perceptions', function() {
    var perceptionsNumber = 10;
    before(function() {
      return testGlobal.createMultipleUsers()
        .then(function(multipleUsers){
          var perceptionsToPost = [];
          for(let user of multipleUsers){
            for(let i = 0; i < perceptionsNumber; i++){
              perceptionsToPost.push({user, perception: {signal: uuidV1(), value: Math.random() * 100}});
            }
          }
          
          return Promise.map(perceptionsToPost, function(perc){
            return request(app)
              .post('/api/perceptions')
              .send(perc.perception)
              .set('authorization', `Bearer ${perc.user.token}`)
              .set('skip-log', true)
              .expect(201)
              .expect('Content-Type', /json/);
          });
        });
    });

    it('Multiple perceptions should be created', function() {
      return Promise.mapSeries(testGlobal.createMultipleUsers(), function(user){
        return request(app)
          .get('/api/perceptions')
          .set('authorization', `Bearer ${user.token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            var perceptions = res.body;
            expect(perceptions).to.be.instanceOf(Array);
            expect(perceptions).to.have.lengthOf(perceptionsNumber);
          });
      });
    })
    
  });
});
