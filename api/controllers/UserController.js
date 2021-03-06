/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
  'new': function (req, res){
  	res.view();
  },

  create: function(req, res, next) {

    var userObj = {
      first_name: req.param('first_name'),
      last_name: req.param('last_name'),
      id_address: "",
      phone: req.param('phone'),
      title: req.param('title'),
      email: req.param('email'),
      encryptedPassword: req.param('encryptedPassword'),
      confirmation: req.param('confirmation'),
      admin: 0
    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    User.create(userObj, function userCreated(err, user) {

      // // If there's an error
      // if (err) return next(err);

      if (err) {
        console.log(err);
        /*req.session.flash = {
          err: err
        }*/

        // If error redirect back to sign-up page
        return res.redirect('/user/new');
      }

      // Log user in
      req.session.authenticated = true;
      req.session.User = user;

      // Change status to online
      user.online = true;
      user.save(function(err, user) {
        if (err) return next(err);

      // add the action attribute to the user object for the flash message.
      user.action = " signed-up and logged-in."

      // Let other subscribed sockets know that the user was created.
      User.publishCreate(user);

        // After successfully creating the user
        // redirect to the show action
        // From ep1-6: //res.json(user); 
        if(req.session.cart == 1){
          res.redirect('/cart/index');
        }else{
          res.redirect('/user/show/' + user.id);
        }
      });
    });
  },

  //render the profile view (e.g /views/show.ejs)
  show: function(req, res, next){
  	User.findOne(req.param('id'), function foundUser(err, user){
  		if (err) return next(err);
  		if (!user) return next();
  		res.view({
  			user: user
  		});
  	});
  },

  index: function(req, res, next){
    // console.log(new Date());
    // console.log(req.session.authenticated);
    
  	// get an array of all useres in the User collection (e.g. table)
  	User.find( function foundUsers(err, users){
  		if (err) return next(err);
		// pass the array to the /views/index.ejs page
  		res.view({
  			users: users
  		});
  	});
  },

  //render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next){
  	//Find user from the id passed via params
  	User.findOne(req.param('id'), function foundUser(err, user){
  		if (err) return next(err);
  		if (!user) return next('User does not exists!');
  		res.view({
  			user: user
  		});
  	});
  },

  // process the info from edit view
  update: function(req, res, next) {

    if (req.session.User.admin) {
      var userObj = {
        first_name: req.param('first_name'),
        last_name: req.param('last_name'),
        title: req.param('title'),
        email: req.param('email'),
        admin: req.param('admin')
      }
    } else {
      var userObj = {
        first_name: req.param('first_name'),
        last_name: req.param('last_name'),
        title: req.param('title'),
        email: req.param('email')
      }
    }

    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }
      res.redirect('/user/show/' + req.param('id'));
    });

  },

  destroy: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);

        // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
        User.publishUpdate(user.id, {
          name: user.name,
          action: ' has been destroyed.'
        });

        // Let other sockets know that the user instance was destroyed.
        User.publishDestroy(user.id);

      });        

      res.redirect('/user');

    });
  }

};
