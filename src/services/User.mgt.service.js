const db = require('../../models/index');
const User = db.users;

const { Forbidden, InternalServerError } = require("http-errors");
const ConfirmAdmin = require("./Authorization");

class UserManagementService {

  /***** LIST AL USERS *****/
  async allUsers(payload) {
    try {
      await ConfirmAdmin.isAdminAuthorized(payload.admin_id);

      const users = await User.findAll({
        attributes : [['uuid', 'user_id'], 'firstname', 'lastname', 'email', 'street', 'type', 'status']
      });
      if (users && users.length == 0) {
        throw InternalServerError("There are no user found.");
      }

      return {
        status: true,
        data: users,
        message: "Users retrieved successfuly",
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


  /***** VIEW SINGLE USER *****/
  async viewUser(payload) {
    try {
      await ConfirmAdmin.isAdminAuthorized(payload.admin_id);

      const data = await User.findOne({
        attributes : [['uuid', 'user_id'], 'firstname', 'lastname', 'email', 'street', 'type', 'status'],

        where : { uuid : payload.user_id}
      });

      if (!data) {
        throw Forbidden("There is no data found for this user_id");
      }

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

  /***** UPDATE USER BY ADMIN *****/
  async updateUserByAdmin(payload) {
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


  /***** UPDATE USER BY USER *****/
  async updateUserByUser(payload) {
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


  /***** DELETE USER CCOUNT *****/
  async deleteUserAccount(payload) {
    try {

      await ConfirmAdmin.isAdminAuthorized(payload.admin_id);

      const deleteData = await User.destroy({ where : { uuid : payload.user_id }});
      if(deleteData == 0){
        throw InternalServerError("No user found for this user_id.");
      }

      return {
        status: true,
        data: null,
        message: "User account was deleted successfuly",
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

module.exports = new UserManagementService();
