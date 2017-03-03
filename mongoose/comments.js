var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  name: {
      type: String,
      require: true
  },
  comment:  {
      type: String,
      require: true
  },
  created_at: {type: Date, default: Date.now}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = commentSchema;
