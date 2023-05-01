const db = require('../../models/index');
const User = db.users;
const Menus = db.menus;
const Cart = db.cart;
const Order = db.order

const { Forbidden, InternalServerError } = require("http-errors");
const ConfirmAdmin = require("./Authorization");

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
        message: "menuData retrieved successfuly",
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


  /***** ADD MENU TO CART *****/
  async addMenuToCart(payload) {
    try {
      

      const is_user = await User.findOne({ where : { uuid : payload.user_id}});
      if (!is_user) {
        throw Forbidden("There is no data found for this user_id");
      }

      const is_menu = await Menus.findOne({ where : { uuid : payload.menu_id}});
      if (!is_menu) {
        throw Forbidden("There is no data found for this user_id");
      }

      const cartObj = {
        title : is_user.firstname + " " + is_user.lastname + " items ",
        quantity : payload.quantity,
        sub_total : is_menu.price,
        total : is_menu.price * payload.quantity,
      }

      //continue from here

      return {
        status: true,
        data: data,
        message: "User details retrieved successfuly",
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
  async seeMyCart(payload) {
    try {
      await ConfirmAdmin.isAdminAuthorized(payload.admin_id);
      const checkUser = await User.findOne({ where : { uuid: payload.user_id}});
      
      if (!checkUser) {
        throw Forbidden("There is no data found for this user_id");
      }

      const userObj = {
        firstname : payload.firstname,
        lastname : payload.lastname,
        street : payload.street,
        email : payload.email,
      }
      const updateData = await User.update(userObj, { where : { uuid : payload.user_id}});
      if (updateData == 0) {
        throw InternalServerError("Sorry, there was a problem performing this operation. Kindly try again.");
      }

      const data = await User.findOne({
        attributes : [['uuid', 'user_id'], 'firstname', 'lastname', 'email', 'street', 'type', 'status'],
        where : { uuid : payload.user_id}
      })

      return {
        status: true,
        data: data,
        message: "User details updated successfuly",
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
  async seeMyOrder(payload) {
    try {

      userObj = {
        firstname : payload.firstname,
        lastname : payload.lastname,
        street : payload.street,
        // email : payload.email,
      }
      const updateData = await User.update(userObj, { where : { uuid : payload.user_id}});
      if (updateData == 0) {
        throw InternalServerError("Sorry, there was a problem performing this operation. Kindly try again.");
      }

      const data = await User.findOne({
        attributes : [['uuid', 'user_id'], 'firstname', 'lastname', 'email', 'street', 'type', 'status'],
        where : { uuid : payload.user_id}
      })

      return {
        status: true,
        data: data,
        message: "Your details was updated successfuly",
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
