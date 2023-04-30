/* eslint-disable class-methods-use-this */
const AuthService = require("../services/Admin.auth.service");
const Responses = require("../utils/responses");

class AuthController {
  
  /***** USER LOGIN ******/
  async userLogin(req, res) {
    const result = await AuthService.login(req.body);
    const { status, error, message, data } = result;

    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  };

  /**** PASSWORD RESET REQUEST ****/
  async passwordResetRequest(req, res) {
    const result = await AuthService.passwordResetRequest(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }


  /***** PASSWORD CHANGE ******/
  async changePassword(req, res) {
    const result = await AuthService.resetPassword(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }
}

module.exports = new AuthController();
