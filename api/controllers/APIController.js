/**
 * APIController
 */

module.exports = {

  getFiveProducts: function(req, res, next){

    // get an array of all articlees in the article collection (e.g. table)
    // Article.find( function foundArticles(err, articles){
    //   if (err) return next(err);
    //   console.log("entra a productos");

    //   res.send(articles);
    // });
    
    //Custom Query
    Article.query('SELECT * FROM article LIMIT 5', function(err, articles) {
      if (err) return next(err);
      res.send(articles);
    });
  },

  getCountries: function(req, res, next){

    //Custom Query
    Country.query('SELECT * FROM country ORDER BY id', function(err, countries) {
      if (err) return next(err);
      res.send(countries);
    });
  },
  getStates: function(req, res, next){

    //Custom Query
    State.query('SELECT * FROM state ORDER BY id', function(err, states) {
      if (err) return next(err);
      res.send(states);
    });
  },
  getCities: function(req, res, next){

    //Custom Query
    City.query('SELECT * FROM city ORDER BY id', function(err, cities) {
      if (err) return next(err);
      res.send(cities);
    });
  },
  getUserData: function(req, res, next){

    //Custom Query
    User.query('SELECT * FROM user WHERE id=' + req.param("userId") + '', function(err, u) {
      if (err) return next(err);
      res.send(u);
    });
  }

};
