/*
 * Order
 */

module.exports = {

  schema: true,
  //autoPK:false,
  

  attributes: {
  	
  	id_user: {
  		type: 'int',
  		required: true
  	},

  	amount: {
  		type: 'float'
  	}

  }

};
