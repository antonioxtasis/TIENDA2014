/*
 * ArticleController
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

  create: function(req, res, next) {

    var articleObject = {
      name: req.param('name'),
      price: req.param('price'),
      active: req.param('active'),
      quantity: req.param('quantity'),
      imageURL: req.param('imageURL'),
      description: req.param('description')
    }

    // Create a Article with the params sent from the --> new.ejs
    Article.create(articleObject, function articleCreated(err, article) {

      if (err) {
        console.log(err);
        // If error redirect back
        //return res.redirect('/article/new');
      }

      article.save(function(err, article) {
        if (err) return next(err);

        res.redirect('/article/');
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
