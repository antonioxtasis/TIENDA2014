/*
 * Article
 */

module.exports = {

  schema: true,

  attributes: {
  	
  	name: {
  		type: 'string',
  		required: true
  	},

  	price: {
  		type: 'int'
  	},

  	active: {
      type: 'boolean',
      defaultsTo: false
    },

    quantity: {
      type: 'int',
      defaultsTo: false
    },

    imageURL: {
      type: 'string'
    },

    description: {
      type: 'string'
    }

  }

};
