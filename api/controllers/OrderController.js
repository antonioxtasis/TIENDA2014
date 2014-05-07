/**
 * HomeController
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

  create: function(req, res, next){

    var ordenObject = {
      id_user: req.session.User.id,
      amount: 0
    }

  	var order_id;
    var acum = 0;
    Orden.create(ordenObject, function (err, orden) {
      if(!err){
        var articles = req.body.articles;
        for (var i = 0; i < articles.length; i++) {

          order_id = orden.id;
          var subtotal = articles[i].quantity*articles[i].price;
          acum=acum+subtotal;
          var ordenObject = {
            id_order: orden.id,
            id_article: articles[i].id,
            cant: articles[i].quantity,
            article_price: articles[i].price,
            subtotal: subtotal
          }
          Orderdetail.create(ordenObject, function (err, orden) {
            console.log(err);
            console.log(orden);
          });

        };

        var ordenObject = {
          id_user: req.session.User.id,
          amount: acum
        }

        Orden.update(order_id, ordenObject, function (err) {
          console.log(err);
        });

      }
    });
  }

};
