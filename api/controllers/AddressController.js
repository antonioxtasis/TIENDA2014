module.exports = {

  'create': function (req, res){

    var addressObj = {
      id_country: req.body.id_country,
      id_state: req.body.id_state,
      id_city: req.body.id_city,
      neighborhood: req.body.neighborhood,
      street: req.body.street,
      number: req.body.number,
      zipcode: req.body.zipcode
    }

    Address.create(addressObj, function articleCreated(err, address) {
    	console.log("error: " + err);
      if(!err){
      console.log("Sesion "+req.session.User.id);
      console.log("Address "+address);
			User.findOne(req.session.User.id).done(function(err, user) {
        console.log(err);
			  user.id_address = address.id;
			  user.save(function(err) {
          console.log(err);
			    if(!err){
			    	req.session.User.id_address = address.id;
			    	res.send(JSON.stringify(address));
			    }
			  });
			});
    	}
    });
  },
}