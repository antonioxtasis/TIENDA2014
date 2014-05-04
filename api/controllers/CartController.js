/*
 * CartController
 */

module.exports = {

  index: function(req, res, next){
    if(req.session.User){
  		res.view();  
  	} else{
  		req.session.cart = 1;
  		res.redirect("/session/new");
  	}
  },

  test: function(req, res, next){
    if(req.session.User){
  		res.view();  
  	} else{
  		req.session.cart = 1;
  		res.redirect("/session/new");
  	}
  }

};
