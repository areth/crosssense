'use strict';

import mongoose from 'mongoose';
import uuidV1 from 'uuid/v1';

const maxValueScale = 0.95;

var SignalSchema = new mongoose.Schema({
  _id: { type: String, default: uuidV1 },
  receptor: String,
  maxValue: Number
});

SignalSchema.statics.maxValueScale = maxValueScale;

SignalSchema.methods.updateMaxValue = function(value) {
  value = Math.abs(value);
  if(!this.maxValue || this.maxValue < value){
  	this.maxValue = value;
  	return true;
  }
  return false;
};

SignalSchema.methods.getScaledValue = function(value) {
  if(!value){
  	return 0;
  }
  var sign = Math.sign(value);
  value = Math.abs(value);
  if(value > this.maxValue){
  	return sign * maxValueScale;
  }
  // todo realize logariphmic scale
  return sign * value / this.maxValue * maxValueScale;
};

export default mongoose.model('Signal', SignalSchema);
