const db = require('../../models/index');
const User = db.users;
const Menus = db.menus;
const Cart = db.cart;
const CartItems = db.cart_items;
const Order = db.order

const { Forbidden, InternalServerError } = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const sendInvoiceEmail = require('../helpers/sendMail');

class UserActivityService {

  /***** LIST ALl MENUS *****/
  async allMenus(payload) {
    try {
      const menuData = await Menus.findAll({
        attributes : [['uuid', 'menu_id'], 'type', 'name', 'price', 'status']
      });
      if (menuData && menuData.length == 0) {
        throw InternalServerError("There are no menu items found.");
      }

      return {
        status: true,
        data: menuData,
        message: "Menu data retrieved successfuly",
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


  /** ADD MENU TO CART
   * This is a single process execution. 
   * It can be upgraded to adding multiple menus at a time
   */
  async addMenuToCart(payload) {
    try {
      
      const is_user = await User.findOne({ where : { uuid : payload.user_id}});
      if (!is_user) {
        throw Forbidden("There is no data found for this user_id");
      }

      const is_menu = await Menus.findOne({ where : { uuid : payload.menu_id}});
      if (!is_menu) {
        throw Forbidden("There is no data found for this menu_id");
      }

      const is_user_cart_active = await Cart.findOne({ where : { userId : is_user.id, status : 'pending'}});
      if(is_user_cart_active){

        
        const cart_item_obj = {
          menu_id : is_menu.uuid,
          description : is_menu.type + " - " + is_menu.name,
          quantity : payload.quantity,
          unit_price : is_menu.price,
          total_amount : is_menu.price * payload.quantity,
          cartId : is_user_cart_active.id,
        };

        const cartObj = {
          total_item : parseInt(is_user_cart_active.total_item) + parseInt(cart_item_obj.quantity),
          total_amount : is_user_cart_active.total_amount + cart_item_obj.total_amount,
        }

        const addItems = await CartItems.create(cart_item_obj);
        await Cart.update(cartObj, { where : { uuid : is_user_cart_active.uuid }});

        const data = await Cart.findOne({ 
          include : [
            {
              model : CartItems,
              attributes : [[ 'uuid', 'cart_item_id'], 'menu_id', 'description', 'quantity', 'unit_price', 'total_amount']
            }
          ],
  
          attributes : [[ 'uuid', 'cart_id'], 'title', 'total_item', 'discount', 'sub_total', 'total_amount', 'status'],
  
          where : { uuid : is_user_cart_active.uuid }
        })

        return {
          status: true,
          data: data,
          message: "Menu item added to cart successfuly",
          error: null
        };
      }

      // CREATE NEW CART
      const cart_obj = {
        title : is_user.firstname + " " + is_user.lastname + " cart details",
        total_item : payload.quantity,
        total_amount : is_menu.price * payload.quantity,
        userId : is_user.id,
      }

      const saveData = await Cart.create(cart_obj);
      if(!saveData){
        throw InternalServerError("There was a problem processing this request. Kindly try again.");
      }

      const cartItem = {
        menu_id : is_menu.uuid,
        description : is_menu.type + " - " + is_menu.name,
        quantity : payload.quantity,
        unit_price : is_menu.price,
        total_amount : is_menu.price * payload.quantity,
        cartId : saveData.id,
      }

      await CartItems.create(cartItem);
      const data = await Cart.findOne({ 
        include : [
          {
            model : CartItems,
            attributes : [[ 'uuid', 'cart_item_id'], 'menu_id', 'description', 'quantity', 'unit_price', 'total_amount']
          }
        ],

        attributes : [[ 'uuid', 'cart_id'], 'title', 'total_item', 'discount', 'sub_total', 'total_amount', 'status'],

        where : { uuid : saveData.uuid }
      })
      return {
        status: true,
        data: data,
        message: "Menu item added to cart successfuly",
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


  /***** SEE MY CART *****/
  async myCartDetails(payload) {
    try {
      
      const is_user = await User.findOne({ where : { uuid: payload.user_id}});
      if (!is_user) {
        throw Forbidden("There is no data found for this user_id");
      }

      const data = await Cart.findOne({
        include : [
          {
            model : CartItems,
            attributes : [[ 'uuid', 'cart_item_id'], 'menu_id', 'description', 'quantity', 'unit_price', 'total_amount']
          },

          {
            model : User,
            attributes : [['uuid', 'user_id'], 'firstname', 'lastname', 'email', 'street', 'type', 'status'],
          },
        ],

        attributes : [['uuid', 'cart_id'], 'title', 'total_item', 'sub_total', 'total_amount', 'status'],
        where : { userId : is_user.id, status : 'pending'},
      })

      return {
        status: true,
        data: data,
        message: "User cart retrieved successfuly",
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


  async placeOrder(payload) {
    try {
      
      const is_user = await User.findOne({ where : { uuid : payload.user_id}});
      if (!is_user) {
        throw Forbidden("There is no data found for this user_id");
      }

      const active_cart = await Cart.findOne({ where : { userId : is_user.id, status : 'pending'}});
      if (!active_cart) {
        throw Forbidden("There is no active cart found for this user");
      }

      var want_delivery = false;
      var address = null;
      var delivery_charges = 0;
      if(payload.add_delivery == true){
        if(!payload.delivery_address){
          throw Forbidden('Please enter your delivery address.');
        }

        want_delivery = true;
        address = payload.delivery_address;
        delivery_charges = 1000
      }

      const order_obj = {
        userId : is_user.id,
        cartId : active_cart.id,
        sub_total : active_cart.total_amount,
        add_delivery : want_delivery,
        delivery_amount : delivery_charges,
        delivery_location : address,
        total_amount : active_cart.total_amount + parseInt(delivery_charges),
      }

      const place_order = await Order.create(order_obj);
      await Cart.update({status : 'checked_out'}, { where : { uuid : active_cart.uuid}});

      //OBTAIN PAYMENT REFERENCE
			const paymentIntent = await stripe.paymentIntents.create({
				amount: place_order.total_amount,
				currency: "usd"
			});

      const data = await Order.findOne({ 
        include : [
          {
            model : User,
            attributes : [['uuid', 'user_id'], 'firstname', 'lastname', 'email', 'street', 'type', 'status'],
          },

          {
            model : Cart,
            attributes : [['uuid', 'cart_id'], 'title', 'total_item', 'sub_total', 'total_amount', 'status'],
          }
        ],
        attributes : [['uuid', 'order_id'], 'sub_total', 'total_amount', 'status', 'add_delivery', 'delivery_amount', 'delivery_location', ],
        where : { uuid : place_order.uuid}
      });

      
      await sendInvoiceEmail.sendOrderReceipt(data).catch(( error ) => {
        throw InternalServerError("Sorry, we could not email you your invoice details.")
      })

      return {
        status: true,
        data: data, //paymantIntent
        message: "Your order was placed successfuly.",
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


  /***** SEE MY ORDER *****/
  async unpaidOrderDetails(payload) {
    try {
      
      const is_user = await User.findOne({ where : { uuid: payload.user_id}});
      if (!is_user) {
        throw Forbidden("There is no data found for this user_id");
      }

      const orderDetails = await Order.findOne({
        include : [
          {
            model : Cart,
            attributes : [['uuid', 'cart_id'], 'title', 'total_item', 'sub_total', 'total_amount', 'status'],

            include : [
              {
                model : CartItems,
                attributes : [[ 'uuid', 'cart_item_id'], 'menu_id', 'description', 'quantity', 'unit_price', 'total_amount']
              }
            ]
          },

          {
            model : User,
            attributes : [['uuid', 'user_id'], 'firstname', 'lastname', 'email', 'street', 'type', 'status'],
          },
        ],

        attributes : [['uuid', 'order_id'], 'sub_total', 'total_amount', 'status', 'add_delivery', 'delivery_amount', 'delivery_location', ],

        where : { userId : is_user.id, status : 'unpaid' }
      })

      return {
        status: true,
        data: orderDetails,
        message: "User Order retrieved successfuly",
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

module.exports = new UserActivityService();
