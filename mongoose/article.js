var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
        type: String,
        required: true
    },
  date: {
        type: Number,
        required: true
      },
  url: {
        type: String,
        required: true
    },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
