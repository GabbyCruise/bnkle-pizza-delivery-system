const db = require('../../models/index');
const sendEmail = require('../helpers/sendMail');
const User = db.users;

const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const AuthHelpers = require("../helpers/authHelper");

class AuthServices {

  /***** TUTOR/STUDENT SIGNUP *****/
  async signup(payload) {
    try {
      const { firstname, lastname, email, phone, type, password, verification_link } = payload; 
      const checkUser = await User.findOne({ where : { email: email}});
      
      if (checkUser) {
        throw Forbidden("user with this email address already exists");
      }

      // hash password
      const hash = await AuthHelpers.hashPassword(password);

      //generate verification/activation token
      const verification_token = await AuthHelpers.generateToken({ userId: email });

      
      const user = await User.create({
        firstname, lastname, phone, email, password: hash, type, verification_token, verification_link
      });
      if (!user) {
        throw InternalServerError("Unable to save user's data");
      }      

      // SEND ACCOUNT VERIFICATION EMAIL
      await sendEmail.sendAccountVerificationEmail(payload).catch((error) => {
        throw InternalServerError('Account verification email could not be sent, contact support')
      });


      return {
        status: true,
        data: {
          firstname: user.firstname,
          email: user.email,
          verification_token
        },
        message: "User created successfull",
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

  /***** ACCOUNT VERIFICATION/ACTIVATION ****/
  async verification(payload) {
    try {
      const { email, token } = payload;

      const user = await User.findOne({ where : { email: email}});
      if (!user) {
        throw Unauthorized("User does not exist");
      };

      if(user.verified === true){
        return {
          status: true,
          data: null,
          message: "Your account has already been verified, kindly login.",
          error: null
        };
      };       

      if(!user.verification_token){
        throw Unauthorized("Token Not Found");
      };

      if(token != user.verification_token){
        throw Unauthorized('Invalid verification token provided');
      };

      const userOBJ = {verification_token: null, verified: true, status: 'active'}
      const activatedUser = await User.update(userOBJ, { where: { uuid: user.uuid }});
      if (activatedUser == 0) {
        throw InternalServerError("Sorry, Account could not be verified, try again.");
      };


      //SEND WELCOME EMAIL
      await sendEmail.sendWelcomeEmail(user).catch((error) => {
        throw InternalServerError('Sorry, we could not send welcome email, contact support ')
      });

      return {
        status: true,
        data: {email:  user.email, firstname: user.firstname, lastname: user.lastname, },
        message: "Account verification successful",
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
      const { email, reset_link } = payload;

      const user = await User.findOne({ where: { email: email}});
      if (!user) {
        throw Unauthorized("User does not exist");
      };

      // generate password reset token
      const token = await AuthHelpers.generateToken({ userId: user.uuid });

      const userOBJ = {reset_token: token, reset_link: reset_link}
      const saved = await User.update(userOBJ, { where: { uuid: user.uuid }});
      if (saved == 0) {
        throw InternalServerError("Sorry, reset request could not be handled, try again.");
      };

      const account_owner = await User.findOne({ where : { email : email }})

      //SEND PASSWORD RESET INSTRUCTION
      await sendEmail.sendPasswordResetEmail(account_owner).catch((error) => {
        throw InternalServerError('Password reset instructions could not be sent, contact support')
      });

      return {
        status: true,
        data: {email:  account_owner.email, firstname: account_owner.firstname, lastname: account_owner.lastname, token: account_owner.reset_token },
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

      const user = await User.findOne({ where: { email: email} });
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

      //SEND PASSWORD CHANGE NOTIF
      await sendEmail.sendPasswordChangeEmail(user).catch((error) => {
        throw InternalServerError('Sorry, We could not send PASSWORD CHANGE EMAIL, try again or contact support.')
      });

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
