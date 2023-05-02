/* eslint-disable class-methods-use-this */
const PaymentMgr = require("../services/User.payment.service");
const Responses = require("../utils/responses");

class UserPaymentController {

  /**** PAY FOR ORDER *****/
  async makeOrderPayments(req, res) {

    const result = await PaymentMgr.payForOrder(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }

	
  /**** CONFIRM ORDER PAYMENT *****/
  async confirmOrderPayment(req, res) {

    const result = await PaymentMgr.confirmOrderPayment(req.body);
    const { status, error, message, data } = result;
    
    if (status) {
      res.status(201).json(Responses.successResponse(message, data));
    } else {
      res.status(error.status || 500).json(Responses.errorResponse(error));
    }
  }
}

module.exports = new UserPaymentController();
