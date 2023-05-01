/* eslint-disable class-methods-use-this */
const UserMgr = require("../services/User.mgt.service");
const Responses = require("../utils/responses");

class UserManagementController {

  /**** LIST ALL ACCOUNTS *****/
  async listAllUsers(req, res) {

    const result = await UserMgr.allUsers(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }

  /**** VIEW USER ACCOUNT *****/
  async viewSingleUser(req, res) {

    const result = await UserMgr.viewUser(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }


  /***** UPDATE USER ACCOUTN BY USER ******/
  async updateMyAccount(req, res) {
    const result = await UserMgr.updateUserByUser(req.body);
    const { status, error, message, data } = result;

    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  };

  /**** UPDATE USE ACCOUNT ADMIN ****/
  async updateUserAccount(req, res) {
    const result = await UserMgr.updateUserByAdmin(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }

  /**** DELETE USER ACCOUNT ADMIN ****/
  async deleteUserAccount(req, res) {
    const result = await UserMgr.deleteUserAccount(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }
}

module.exports = new UserManagementController();
