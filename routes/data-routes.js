let Article = require('../mongoose/article.js');

module.exports = (app, io) => {

    app.get('/api/saved', (req, res) => {
        Article.find({}, (err, data) => {
            res.send(data);
        });
    });

    app.post('/api/saved', (req, res) => {

        req.body = JSON.parse(req.body);

        io.emit('serverMessage', req.body);

        Article.findOne({title: req.body.title}, (err, art) => {
          if (err) throw err;

          if (!art) {

              let newArticle = new Article({
                  title: req.body.title,
                  date: req.body.date,
                  url: req.body.url
              });

              newArticle.save(function(err) {
                if (err) throw err;
                console.log('User saved successfully!');
              });
          } else {
              console.log('Article already exists in database!');
          }
        });


    });

    app.delete('/api/saved', (req, res) => {

        req.body = JSON.parse(req.body);

        Article.remove({title: req.body.title}, (err, removed) => {
            res.send(removed);
        });

    });
}
