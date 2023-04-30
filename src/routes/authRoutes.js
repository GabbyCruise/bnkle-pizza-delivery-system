const express = require("express");
const { signupValidation, loginValidation, verifiyValidation, passRequestResetValidation, passwordChange } = require("../helpers/validationSchema");
const { validator } = require("../middleware/validationMid");
const AuthController = require("../controllers/authController");
const AdminAuthController = require('../controllers/admin.auth.controller')

const router = express.Router();

// FOR ADMINS
router.post("/admin-login", validator(loginValidation), AdminAuthController.userLogin);
router.patch('/admin-password-reset-request', validator(passRequestResetValidation), AdminAuthController.passwordResetRequest);
router.patch('/admin-reset-password', validator(passwordChange), AdminAuthController.changePassword);

// FOR STUDENTS AND TUTORS
router.post("/signup", validator(signupValidation), AuthController.userSignup);
router.post('/verify', validator(verifiyValidation), AuthController.verifyUser);
router.post("/login", validator(loginValidation), AuthController.userLogin);
router.patch('/password-reset-request', validator(passRequestResetValidation), AuthController.passwordResetRequest);
router.patch('/reset-password', validator(passwordChange), AuthController.changePassword);

module.exports = router;
