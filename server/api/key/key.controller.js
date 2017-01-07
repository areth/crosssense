'use strict';

import jsonpatch from 'fast-json-patch';
import Key from './key.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
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

// Gets a single Key from the DB
export function index(req, res) {
  return Key.getOrCreate(req.user.receptor)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Set key to user value
export function set(req, res) {
  return Key.getOrCreate(req.user.receptor)
    .then(function(key){
      if(req.body.key){
        key.key = req.body.key;
      }
      return key.save();
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
