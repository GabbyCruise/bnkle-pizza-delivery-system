const db = require('../../models/index');
const sendEmail = require('../helpers/sendMail');
const User = db.users;

const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const AuthHelpers = require("../helpers/authHelper");

class AuthServices {

  /***** SIGNUP SERVICE *****/
  async signup(payload) {
    try {
      const { firstname, lastname, email, street, password } = payload; 
      const checkUser = await User.findOne({ where : { email: email}});
      
      if (checkUser) {
        throw Forbidden("user with this email address already exists");
      }

      const hash = await AuthHelpers.hashPassword(password);
      
      const user = await User.create({
        firstname, lastname, email, street, password: hash,
      });
      if (!user) {
        throw InternalServerError("Unable to save user's data");
      }

      return {
        status: true,
        data: {
          firstname: user.firstname, lastname : user.lastname,
          email: user.email, street : user.street
        },
        message: "User signed up successfuly",
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


  /***** USER LOGIN *****/
  async login(payload) {
    try {
      const { email, password } = payload;

      const is_user = await User.findOne({ where : { email: email}});
      if (!is_user) {
        throw Unauthorized('No record found for this email address');
      }

      const is_password_correct = await AuthHelpers.isPasswordValid(is_user.password, password);

      if (!is_password_correct) {
        throw Unauthorized("Invalid password, kindly enter your correct password.");
      }

      const token = await AuthHelpers.generateToken({ userId: is_user.uuid });

      is_user.password = null;
      return {
        status: true,
        data: {
          user_id : is_user.uuid, firstname:  is_user.firstname, 
          lastname: is_user.lastname, 
          email: is_user.email, type : is_user.type, token: token 
        },
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
  async forgotPassword(payload) {
    try {
      const { email, reset_link } = payload;

      //IMPLEMENT PROCESS

      return {
        status: true,
        data: null,
        message: "Password reset instructions sent successfully",
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

      // IMPLEMENT PROCESS 

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
