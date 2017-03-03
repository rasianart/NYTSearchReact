var path = require("path");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
let Article = require('../mongoose/article.js');



module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
      });

    app.get("/load", (req, res) => {
        request("https://www.hyperallergic.com", (error, response, html) => {

            var $ = cheerio.load(html);
            var linkObj = {};
            var articleObj = {};

            let random = Math.floor(Math.random() * 10);

            $(".entry-excerpt").each((i, element) => {

                if (i === random) {

                    let header = $(element).children('header');
                    let h3 = header.children('h3');
                    let link = h3.children('a').attr('href');
                    request(link, (error2, response2, html2) => {

                        var $2 = cheerio.load(html2);

                        let title = $2('h1.entry-title').text();
                        let summary = $2('div.entry-dek').children().text();
                        let bodyHolder = $2('div.entry-content');
                        let body = bodyHolder.find(">:first-child").find(">:first-child");
                        let img = body.find(">:first-child").children('img').attr('src');
                        let paragraphs = body.children('p');
                        let text = '';
                        paragraphs.each((i, element) => {
                            text += $2(element).text();
                        });

                        articleObj = {
                            title: title,
                            img: img,
                            summary: summary,
                            text: text
                        }

                        Article.findOne({title: articleObj.title}, (err, art) => {
                          if (err) throw err;

                          if (!art) {

                              let newArticle = new Article(articleObj);

                              newArticle.save(function(err) {
                                if (err) throw err;
                                console.log('User saved successfully!');
                              });
                          } else {

                              articleObj.comments = art.comments;
                              console.log(articleObj);
                              res.send(articleObj);

                          }
                        });

                        // console.log(articleObj);
                        // res.send(articleObj);
                        // res.render("home", {articleObj});
                    });

                    linkObj = {
                        link: link
                    };
                }
            });
        });
    });
}
