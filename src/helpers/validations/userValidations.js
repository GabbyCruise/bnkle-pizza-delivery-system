const Joi = require("@hapi/joi");

/******** SIGN UP INPUT VALIDATIONS **********/
const signupValidation = Joi.object().keys({
  firstname: Joi.string().trim().min(2).label("firstname").required(),

  lastname: Joi.string().trim().min(2).label("lastname").required(),

  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),

  street: Joi.string().trim().min(5).label("street").required(),

  password: Joi.string().trim().min(2).label("password")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength").required(),
});

/******** UPDATE USER ACCOUNT BY ADMIN **********/
const updateUserAccountValidation = Joi.object().keys({
  admin_id: Joi.string().trim().min(2).label("admin_id").required(),

  user_id: Joi.string().trim().min(2).label("user_id").required(),

  firstname: Joi.string().trim().min(2).label("firstname").required(),

  lastname: Joi.string().trim().min(2).label("lastname").required(),

  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),

  street: Joi.string().trim().min(5).label("street").required(),
});

/******** UPDATE USER ACCOUNT BY USER **********/
const updateMyAccountValidation = Joi.object().keys({
  user_id: Joi.string().trim().min(2).label("user_id").required(),
  
  firstname: Joi.string().trim().min(2).label("firstname").required(),

  lastname: Joi.string().trim().min(2).label("lastname").required(),

  street: Joi.string().trim().min(5).label("street").required(),
});


/******** LOGIN INPUT VALIDATIONS **********/
const loginValidation = Joi.object().keys({

  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),

  password: Joi.string().trim().min(2).label("password").required(),
});

/*********** FORGOT PASSWORD VALIDATION *********/
const forgotPasswordValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),
});

/*********** RESET PASSWORD VALIDATIONS *********/
const resetPasswordValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),

  token: Joi.string().trim().min(2).label("token").required(),

  password: Joi.string().trim().min(2).label("password")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength").required(),
});

/********LIST USERS VALIDATION **********/
const listUsersValidation = Joi.object().keys({
  admin_id: Joi.string().trim().min(2).label("admin_id").required(),
});

const userAccessValidation = Joi.object().keys({
  user_id: Joi.string().trim().min(2).label("user_id").required(),
});

const addToCartValidation = Joi.object().keys({
  user_id: Joi.string().trim().min(2).label("user_id").required(),
  menu_id: Joi.string().trim().label("menu_id").required(),
  quantity: Joi.string().trim().min(1).label("quantity").required(),
});

/***** PLACE USER ORDER ****/
const placeOrderValidation = Joi.object().keys({
  user_id: Joi.string().trim().min(2).label("user_id").required(),
  // cart_id: Joi.string().trim().label("cart_id").required(),
  add_delivery: Joi.string().trim().min(1).label("add_delivery").required(),
});

/****** View USERS DETAISL VALIDATION **********/
const viewUserValidation = Joi.object().keys({
  admin_id: Joi.string().trim().min(2).label("admin_id").required(),
  user_id: Joi.string().trim().min(2).label("user_id").required(),
});



module.exports = {
  signupValidation, loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updateMyAccountValidation, listUsersValidation,
  updateUserAccountValidation, viewUserValidation,
  userAccessValidation, addToCartValidation,
  placeOrderValidation,
};
