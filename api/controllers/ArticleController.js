/**
 * ArticleController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

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

  getProducts: function(req, res, next){

    /*get an array of all articlees in the article collection (e.g. table)
    Article.find( function foundArticles(err, articles){
      if (err) return next(err);
      console.log("entra a productos");
    // pass the array to the /views/index.ejs page
      res.send(articles);
    });*/

    
    //Custom Query
    Article.query('SELECT * FROM article where price=100', function(err, articles) {
      if (err) return next(err);
      res.send(articles);
    });

  }, 

  create: function(req, res, next) {

    var articleObj = {
      name: req.param('name'),
      price: req.param('price'),
      active: req.param('active'),
      quantity: req.param('quantity'),
      imageURL: req.param('imageURL')
    }

    // Create a Article with the params sent from the --> new.ejs
    Article.create(articleObj, function articleCreated(err, article) {

      if (err) {
        console.log(err);
        // If error redirect back
        //return res.redirect('/article/new');
      }

      article.save(function(err, article) {
        if (err)
          return next(err);

        res.redirect('/article/');

      });
    });

  }

};
