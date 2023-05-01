/* eslint-disable class-methods-use-this */
const ActivityMgr = require("../services/User.activity.service");
const Responses = require("../utils/responses");

class UserActivityController {

  /**** LIST ALL MENU *****/
  async getAllMenus(req, res) {

    const result = await ActivityMgr.allMenus(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }

  /**** ADD MENU TO CART *****/
  async populateCart(req, res) {
    const result = await ActivityMgr.addMenuToCart(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }


  /***** USER CART ******/
  async getUserCart(req, res) {
    const result = await ActivityMgr.myCartDetails(req.body);
    const { status, error, message, data } = result;

    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  };

  /**** PLACE AN ORDER ****/
  async placeUserOrder(req, res) {
    const result = await ActivityMgr.placeOrder(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }


  /**** USER ORDER ****/
  async getUserOrder(req, res) {
    const result = await ActivityMgr.unPaidDetailsOrder(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }

  /**** DELETE USER ACCOUNT ADMIN ****/
  async deleteUserAccount(req, res) {
    const result = await ActivityMgr.deleteUserAccount(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }
}

module.exports = new UserActivityController();
