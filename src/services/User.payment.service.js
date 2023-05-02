require("dotenv").config()
const db = require('../../models/index');
const User = db.users;
const Order = db.order

const { Forbidden, InternalServerError, NotFound } = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);



class UserPaymentServices {

	/***** PAY FOR ORDER *****/
  async payForOrder(payload) {
    try {
      
      const is_user = await User.findOne({ where : { uuid: payload.user_id}});
      if (!is_user) {
        throw Forbidden("There is no data found for this user_id");
      }

      const confirmOrder = await Order.findOne({where : { userId : is_user.id, status : 'unpaid' }});
      if(!confirmOrder){
        throw NotFound("You don't have any pending order.")
      }

      //OBTAIN PAYMENT REFERENCE FROM STRIPE
			const paymentIntent = await stripe.paymentIntents.create({
				amount: confirmOrder.total_amount,
				currency: "usd"
			});

      //CHECK OUT
      // const paymentUrl = await stripe.checkout.sessions.create({
      //   payment_method_types: ["card"],
      //   mode: "payment",
      //   amount: paymentIntent.amount,        
      // });


      return {
        status: true,
        data: paymentIntent,//paymentUrl.url,
        message: "Payment made",
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
  };

  /*** CONFIRM ORDER PAYMENT ***/
  async confirmOrderPayment(payload){
    try {

      // Complete payment confirmation from stripe
      // Create Payment transaction for user

      return {
        status: true,
        data: null,
        message: null,
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


  /*** USER PAYMENTS ***/
  async userPayments(payload){
    try {

      // Retrieve users payment history

      return {
        status: true,
        data: null,
        message: null,
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

module.exports = new UserPaymentServices();


