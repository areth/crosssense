/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/perceptions              ->  index
 * POST    /api/perceptions              ->  create
 * GET     /api/perceptions/:id          ->  show
 * PUT     /api/perceptions/:id          ->  upsert
 * PATCH   /api/perceptions/:id          ->  patch
 * DELETE  /api/perceptions/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Perception from './perception.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

const perceptionsHistoryLimit = 20;
// Gets a list of Perceptions
export function index(req, res) {
  var query = Perception.find({receptor: req.user.receptor});
  if(req.lastSeen){
    query.where('createdAt').lt(req.lastSeen);
  }
  query.limit(perceptionsHistoryLimit);
  return query.exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Perception in the DB
export function add(req, res) {
  req.body.receptor = req.user.receptor;

  return Perception.add(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Deletes a Perception from the DB
export function destroy(req, res) {
  return Perception.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
