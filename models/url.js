'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
});

const counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  short_url: String,
  createdOn:{type:Date , default :Date.now}
});

urlSchema.pre('save', function(next){
  let doc = this;
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} },{ "upsert": true, "new": true }, function(error, counter) {
      if (error)
          return next(error);
      doc._id = counter.seq;
      next();
  });
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
