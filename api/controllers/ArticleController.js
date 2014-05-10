/*
 * ArticleController
 */
var uuid = require('node-uuid');
var fs = require('fs');

module.exports = {

  'new': function (req, res){
    res.view();
  },

  index: function(req, res, next){
    
    // get an array of all articlees in the article collection (e.g. table)
    Article.find( function foundArticles(err, articles){
      if (err) return next(err);
    // pass the array to the /views/index.ejs page
      res.view({
        articles: articles
      });
    });
  }, 

  create: function(req, res, next) {  
    console.log(req.files);

    fs.readFile(req.files.imageURL2.path, function (err, data) {
      var randomstring = require("randomstring");
      var random = randomstring.generate();
      var name = req.files.imageURL2.name.split(".");
      var newPath = "/Users/javieret/src/TIENDA2014/assets/images/"+random+"."+name[1];
      fs.writeFile(newPath, data, function (err) {
        var articleObject = {
          name: req.param('name'),
          price: req.param('price'),
          active: req.param('active'),
          quantity: req.param('quantity'),
          imageURL: "/images/"+random+"."+name[1],
          description: req.param('description')
        }
          // Create a Article with the params sent from the --> new.ejs
          Article.create(articleObject, function articleCreated(err, article) {
            if (err) {
              console.log(err);
              // If error redirect back
              //return res.redirect('/article/new');
            }else{
              res.redirect('/article/');
            }


          });

      });
    });
  },

  getArticleByCategoryId: function(req, res, next){

    //Custom Query
    Article.query('SELECT * FROM onlinestore.article WHERE id_article_category = ' + req.param("idCategory") + ' ORDER BY name', function(err, categories) {

      if (err) return next(err);
      res.send(categories);
    });
  }

};
