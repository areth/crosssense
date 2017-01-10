'use strict';

import mongoose from 'mongoose';
import uuidV1 from 'uuid/v1';
var mongooseHidden = require('mongoose-hidden')();

var ReceptorSchema = new mongoose.Schema({
  _id: { type: String, default: uuidV1 },
  user: String
});
ReceptorSchema.plugin(mongooseHidden);

export default mongoose.model('Receptor', ReceptorSchema);
