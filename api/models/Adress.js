/*
 * Adress
 */

module.exports = {

  schema: true,
  //autoPK:false,
  

  attributes: {
  	
  	id_country: {
  		type: 'int'
  	},
  	id_state: {
      type: 'int'
    },
    id_city: {
      type: 'int'
    },
    neighborhood: {
      type: 'string'
    },
    street: {
      type: 'string'
    },
    number: {
      type: 'string'
    },
    zipcode: {
      type: 'int'
    },

  }

};
