var transform = require('../utils/transform');
var id2short = transform['id2short'];
var short2id = transform['short2id'];
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const domain = 'http://localhost:3000/';

const urlSchema = new Schema({
    longUrl : { type: String, required: true, index: true, unique: true},
    shortUrl : { type: String, required: true, index: true, unique: true}
}); //_id : { type: Schema.Types.ObjectId, required: true, index: true, unique: true}, 

urlSchema
  .virtual('id')
  .get(function () {
    return short2id(this.shortUrl);
  });

urlSchema
  .virtual('fullShortUrl')
  .get(function () {
    return domain + this.shortUrl;
  });
  
module.exports = mongoose.model('url', urlSchema, 'url' );