const express = require('express')
const { 
  signupValidation, loginValidation,
  forgotPasswordValidation, resetPasswordValidation 
} = require('../helpers/validations/userValidations')
const { validator } = require("../middleware/validationMid");
const AuthController = require("../controllers/authController");

const router = express.Router();


// USER AUTH ROUTE
router.post("/signup", validator(signupValidation), AuthController.userSignup);
router.post("/login", validator(loginValidation), AuthController.userLogin);
router.patch('/forgot-password', validator(forgotPasswordValidation), AuthController.passwordResetRequest);
router.patch('/reset-password', validator(resetPasswordValidation), AuthController.changePassword);

module.exports = router;
