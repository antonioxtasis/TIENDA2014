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
      type: 'string', 
      required: true
    },
    street: {
      type: 'string', 
      required: true
    },
    number: {
      type: 'string', 
      required: true
    },
    zipcode: {
      type: 'int', 
      required: true
    },

  }

};
