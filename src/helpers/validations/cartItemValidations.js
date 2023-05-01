const Joi = require("@hapi/joi");

/******** ADD NEW CART **********/
const addToCartValidation = Joi.object().keys({
  user_id: Joi.string().trim().min(2).label("user_id").required(),

  menu_id: Joi.string().trim().min(2).label("menu_id").required(),

  quantity: Joi.string().trim().min(2).label("quantity").required(),
});


/******** UPDATE CART **********/
const updateCartValidation = Joi.object().keys({
  user_id: Joi.string().trim().min(2).label("user_id").required(),

  cart_id: Joi.string().trim().min(2).label("cart_id").required(),

  quantity: Joi.string().trim().min(2).label("quantity").required(),
});



module.exports = {
  addToCartValidation,
  updateCartValidation,
};
