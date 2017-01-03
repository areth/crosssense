/**
 * Signal model events
 */

'use strict';

import {EventEmitter} from 'events';
import Signal from './signal.model';
var SignalEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SignalEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Signal.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SignalEvents.emit(event + ':' + doc._id, doc);
    SignalEvents.emit(event, doc);
  };
}

export default SignalEvents;
