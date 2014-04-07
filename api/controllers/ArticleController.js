/**
 * articleController
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

  // This loads the sign-up page --> new.ejs
  /*'new': function (req, res){
    res.view();
  },*/

  /*create: function(req, res, next) {

    var articleObj = {
      name: req.param('name'),
      price: req.param('price'),
      active: req.param('active'),
      quantity: req.param('quantity'),
      imageURL: req.param('imageURL')
    }

    // Create a article with the params sent from 
    // the sign-up form --> new.ejs
    Article.create(articleObj, function articleCreated(err, article) {

      // // If there's an error
      // if (err) return next(err);

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/article/new');
      }

      // Log article in
      req.session.authenticated = true;
      req.session.article = article;

      // Change status to online
      Article.online = true;
      Article.save(function(err, article) {
        if (err) return next(err);

      // add the action attribute to the article object for the flash message.
      Article.action = " signed-up and logged-in."

      // Let other subscribed sockets know that the article was created.
      Article.publishCreate(article);

        // After successfully creating the article
        // redirect to the show action
        // From ep1-6: //res.json(article); 

        res.redirect('/article/show/' + Article.id);
      });
    });
  },*/

  //render the profile view (e.g /views/show.ejs)
  /*show: function(req, res, next){
    Article.findOne(req.param('id'), function foundArticle(err, article){
      if (err) return next(err);
      if (!article) return next();
      res.view({
        article: article
      });
    });
  },*/

  index: function(req, res, next){
    // console.log(new Date());
    // console.log(req.session.authenticated);
    
    // get an array of all articlees in the article collection (e.g. table)
    Article.find( function foundArticles(err, articles){
      if (err) return next(err);
    // pass the array to the /views/index.ejs page
      res.view({
        articles: articles
      });
    });
  }/*,

  //render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next){
    //Find article from the id passed via params
    Article.findOne(req.param('id'), function foundArticle(err, article){
      if (err) return next(err);
      if (!article) return next('article does not exists!');
      res.view({
        article: article
      });
    });
  },*/

  // process the info from edit view
  /*update: function(req, res, next) {

    if (req.session.Article.admin) {
      var articleObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email'),
        admin: req.param('admin')
      }
    } else {
      var articleObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email')
      }
    }

    Article.update(req.param('id'), articleObj, function articleUpdated(err) {
      if (err) {
        return res.redirect('/article/edit/' + req.param('id'));
      }

      res.redirect('/article/show/' + req.param('id'));
    });
  },*/

  /*destroy: function(req, res, next) {

    Article.findOne(req.param('id'), function foundArticle(err, article) {
      if (err) return next(err);

      if (!article) return next('article doesn\'t exist.');

      Article.destroy(req.param('id'), function articleDestroyed(err) {
        if (err) return next(err);

        // Inform other sockets (e.g. connected sockets that are subscribed) that this article is now logged in
        Article.publishUpdate(Article.id, {
          name: Article.name,
          action: ' has been destroyed.'
        });

        // Let other sockets know that the article instance was destroyed.
        Article.publishDestroy(Article.id);

      });        

      res.redirect('/article');

    });
  }*/

};
