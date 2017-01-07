'use strict';

import mongoose from 'mongoose';
import uuidV1 from 'uuid/v1';
var mongooseHidden = require('mongoose-hidden')();

var PredictionSchema = new mongoose.Schema({
  _id: { type: String, default: uuidV1 },
  receptor: String,
  signal: String,
  value: Number
});
PredictionSchema.plugin(mongooseHidden);

export default mongoose.model('Prediction', PredictionSchema);
