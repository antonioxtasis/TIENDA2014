/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  schema: true,

  attributes: {
  	
  	first_name: {
  		type: 'string',
  		required: true
  	},

    last_name: {
      type: 'string',
      required: true
    },

    id_address: {
      type: 'int'
    },

    phone: {
      type: 'string'
    },

  	title: {
  		type: 'string'
  	},

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	encryptedPassword: {
  		type: 'string'
  	},

    online: {
      type: 'boolean',
      defaultsTo: false
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }

  },


  beforeValidation: function (values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else  if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
     next();
  },

  beforeCreate: function (values, next) {
    var hash = bcrypt.hashSync(values.encryptedPassword);
    values.encryptedPassword = hash;
    values.online = true;
    next();
  }

};
