var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
        type: String
    },
  date: {
        type: String
      },
  url: {
        type: String
    },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
