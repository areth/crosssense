/**
 * Receptor model events
 */

'use strict';

import {EventEmitter} from 'events';
import Receptor from './receptor.model';
var ReceptorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReceptorEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Receptor.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ReceptorEvents.emit(event + ':' + doc._id, doc);
    ReceptorEvents.emit(event, doc);
  };
}

export default ReceptorEvents;
