'use strict';

import mongoose from 'mongoose';
import uuidV1 from 'uuid/v1';
import Signal from '../signal/signal.model';
var mongooseHidden = require('mongoose-hidden')();

var PerceptionSchema = new mongoose.Schema({
  _id: { type: String, default: uuidV1 },
  createdAt : { type : Date, default: Date.now, index: true },
  receptor: String,
  _signal: {type: String, hide: true},
  signal: String,
  value: Number,
	_valueScaled: {type: Number, hide: true}  
});
PerceptionSchema.plugin(mongooseHidden, { hidden: { _id: false } });
PerceptionSchema.index({receptor: 1, createdAt: -1});

// add new perception and all relations
PerceptionSchema.statics.add = function(perception) {
  var model = this;
  return Signal.findOne({receptorSignal: perception.signal, receptor: perception.receptor}).exec()
  	.then(function(signal){
			if(!signal){
				var newSignal = new Signal({
					receptorSignal: perception.signal,
					receptor: perception.receptor
				});
				newSignal.updateMaxValue(perception.value);
				return newSignal.save();
			}
			if(signal.updateMaxValue(perception.value)){
				return signal.save();
			}
			return signal;
  	})
  	.then(function(signal){
  		delete perception._id;
  		delete perception.createdAt;
  		perception._valueScaled = signal.getScaledValue(perception.value);
  		perception._signal = signal._id
  		return model.create(perception);
  	});
};

export default mongoose.model('Perception', PerceptionSchema);