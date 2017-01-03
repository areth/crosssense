'use strict';

import mongoose from 'mongoose';
import uuidV1 from 'uuid/v1';
import Signal from '../signal/signal.model';

var PerceptionSchema = new mongoose.Schema({
  _id: { type: String, default: uuidV1 },
  createdAt : { type : Date, default: Date.now, index: true },
  receptor: String,
  signal: String,
  value: Number,
	valueScaled: Number  
});

PerceptionSchema.index({receptor: 1, createdAt: -1});

// add new perception and all relations
PerceptionSchema.statics.add = function(perception) {
  var model = this;
  return Signal.findOne({_id: perception.signal, receptor: perception.receptor}).exec()
  	.then(function(signal){
			if(!signal){
				var newSignal = new Signal({
					_id: perception.signal,
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
  		perception.valueScaled = signal.getScaledValue(perception.value);
  		return model.create(perception);
  	});
};

export default mongoose.model('Perception', PerceptionSchema);