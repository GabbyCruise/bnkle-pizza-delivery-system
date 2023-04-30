const Joi = require("@hapi/joi");

/******** SIGN UP INPUT VALIDATIONS **********/
const signupValidation = Joi.object().keys({
  firstname: Joi.string().trim().min(2).label("firstname").required(),

  lastname: Joi.string().trim().min(2).label("lastname").required(),

  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),

  phone: Joi.string().trim().min(2).label("phone").required(),

  type: Joi.string().trim().min(2).label("type").required(),

  verification_link: Joi.string().trim().min(2).label("verification_link").required(),

  password: Joi.string().trim().min(2).label("password")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength").required(),
});

/*********** LOGIN INPUT VALIDATIONS *********/
const loginValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),
  password: Joi.string().trim().label("password").required()
});

/*********** ACCOUNT VERIFICATION VALIDATIONS *********/
const verifiyValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),
  token: Joi.string().trim().label("token").required()
});

/*********** PASSWORD RESET REQUEST INPUT VALIDATIONS *********/
const passRequestResetValidation = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),
  reset_link: Joi.string().trim().min(2).label("reset_link").required(),
});

/*********** PASSWORD CHANGE VALIDATIONS *********/
const passwordChange = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).label("email").required(),

  token: Joi.string().trim().min(2).label("token").required(),

  password: Joi.string().trim().min(2).label("password")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, "required password strength").required(),
});


const dataUpdateIdValidation = Joi.object().keys({
  id: Joi.string().trim().label("id").required()
});


/***** BASIC DETAILS INPUT VALIDATIONS *******/
const basicDetailsValidation = Joi.object().keys({
  name: Joi.string().trim().min(2).label("name").required(),

  overview: Joi.string().trim().min(2).label("overview").required(),

  position: Joi.string().trim().min(2).label("position").required(),
});


/***** ABOUT DETAILS INPUT VALIDATIONS *******/
const aboutValidation = Joi.object().keys({
  about: Joi.string().trim().min(2).label("about").required(),
});


/***** SKILL INPUT VALIDATIONS *******/
const skillsValidation = Joi.object().keys({

  title: Joi.string().trim().min(2).label("title").required(),

  details: Joi.string().trim().min(2).label("details").required(),
});


/***** EXPERIENCE INPUT VALIDATIONS *******/
const experienceValidation = Joi.object().keys({
  position: Joi.string().trim().min(2).label("position").required(),

  company: Joi.string().trim().min(2).label("company").required(),

  location: Joi.string().trim().min(2).label("location").required(),
});


const shapeValidation = Joi.object().keys({
  shape: Joi.string().required(),
  dimensions: Joi.object().keys({
    side: Joi.number(),
    length_a: Joi.number(),
    length_b: Joi.number(),
    length_c: Joi.number(),
    radius: Joi.number(),
    length: Joi.number(),
    breadth: Joi.number()
  })
});

module.exports = {
  signupValidation,
  loginValidation,
  basicDetailsValidation,
  experienceValidation,
  dataUpdateIdValidation,
  skillsValidation,
  shapeValidation,
  aboutValidation,
  verifiyValidation,
  passRequestResetValidation,
  passwordChange
};
