/*
 * Order
 */

module.exports = {

  schema: true,
  //autoPK:false,
  

  attributes: {
  	
  	id_order: {
  		type: 'int',
  		required: true
  	},

  	id_article: {
  		type: 'int',
      required: true
  	}, 

    cant: {
      type: 'int',
      required: true
    }, 

    article_price: {
      type: 'float',
      required: true
    }, 

    subtotal: {
      type: 'float',
      required: true
    }, 

  }

};
