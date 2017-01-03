'use strict';

import mongoose from 'mongoose';
import uuidV1 from 'uuid/v1';

var ReceptorSchema = new mongoose.Schema({
  _id: { type: String, default: uuidV1 },
  user: String
});

export default mongoose.model('Receptor', ReceptorSchema);
