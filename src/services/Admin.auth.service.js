const db = require('../../models/index');
const User = db.admins;

const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const AuthHelpers = require("../helpers/authHelper");

class AuthServices {

  /***** USER LOGIN *****/
  async login(payload) {
    try {
      const { email, password } = payload;

      const user = await User.findOne({ where : { email: email}});
      if (!user) {
        throw Unauthorized('No record found for this email address');
      }

      // check if password is correct
      const checkPassword = await AuthHelpers.isPasswordValid(user.password, password);

      if (!checkPassword) {
        throw Unauthorized("Invalid password, kindly enter your correct password.");
      }

      if(user.verified === false){
        throw Unauthorized("Please verify your email address to activate your account");
      }

      // create token
      const token = await AuthHelpers.generateToken({ userId: user.uuid });

      // removed the password from the returned data
      user.password = null;      

      return {
        status: true,
        data: {firstname:  user.firstname, lastname: user.lastname, email: user.email, token: token },
        message: "Authentication successful",
        error: null
      };
    } catch (error) {
      return {
        status: false,
        data: null,
        message: error.message,
        error
      };
    }
  }


  /***** PASSWORD RESET REQUEST *****/
  async passwordResetRequest(payload) {
    try {
      const { email } = payload;

      const user = await User.findOne({ where: { email: email}});
      if (!user) {
        throw Unauthorized("User does not exist");
      };

      // generate password reset token
      const token = await AuthHelpers.generateToken({ userId: user.uuid });

      const userOBJ = {reset_token: token}
      const saved = await User.update(userOBJ, { where: { uuid: user.uuid }});
      if (saved == 0) {
        throw InternalServerError("Sorry, reset request could not be handled, try again.");
      };

      //TODO: send reset intructions to email

      return {
        status: true,
        data: null,
        message: "Password reset instructions sent successfully to " + user.email,
        error: null
      };

    } catch (error) {
      return {
        status: false,
        data: null,
        message: error.message,
        error
      };
    }
  }


  /***** RESET PASSWORD *****/
  async resetPassword(payload) {
    try {
      const { email, token, password } = payload;

      const user = await User.findOne({ where : { email: email}});
      if (!user) {
        throw Unauthorized("User does not exist");
      };

      if(!user.reset_token){
        throw Unauthorized("Password Reset token Not Found");
      };

      if(user.reset_token != token){
        throw Unauthorized('Invalid reset token provided. Try again with the correct link sent to your email.')
      }

      // hash password
      const hash = await AuthHelpers.hashPassword(password);

      const userOBJ = {reset_token: null, password: hash, reset_count: user.reset_count+1}
      const saved = await User.update(userOBJ, { where: { uuid: user.uuid }});
      if (saved == 0) {
        throw InternalServerError("Sorry, We could not reset your password, try again.");
      };

      //TODO: send notification email

      return {
        status: true,
        data: null,
        message: "Your password was changed successfully.",
        error: null
      };

    } catch (error) {
      return {
        status: false,
        data: null,
        message: error.message,
        error
      };
    }
  }
}

module.exports = new AuthServices();
