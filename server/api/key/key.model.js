'use strict';

import mongoose from 'mongoose';
import uuidV1 from 'uuid/v1';
var mongooseHidden = require('mongoose-hidden')();

var KeySchema = new mongoose.Schema({
  _id: { type: String, default: uuidV1 },
  receptor: {type: String, unique: true},
  key: { type: String, default: uuidV1 }
});
KeySchema.plugin(mongooseHidden);

KeySchema.statics.getOrCreate = function(receptor){
	var model = this;
	return model.findOne({receptor}).exec()
		.then(function(key){
			return key ? key : model.create({receptor});
		});
};

export default mongoose.model('Key', KeySchema);
