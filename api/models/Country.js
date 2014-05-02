/*
 * Country
 */

module.exports = {

  schema: true,
  //autoPK:false,
  

  attributes: {
  	
  	code: {
  		type: 'string',
  		required: true
  	},

  	latitude: {
  		type: 'float'
  	},

  	longitude: {
      type: 'float'
    },

    name: {
      type: 'string'
    }

  }

};
