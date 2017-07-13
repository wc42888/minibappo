var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectSchema = new Schema({
  name: {type: String, default: 'no name'},
  key: String,
  color: {type: String, default: 'no color'},
  comments: {type: String, default: 'no comments'}
}, {
  minimize: false,
})

module.exports = mongoose.model('Object', ObjectSchema);
