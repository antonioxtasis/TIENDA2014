/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
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
    }

  }

};
