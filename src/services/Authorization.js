const db = require('../../models/index');
const Admin = db.users;

const { Unauthorized } = require("http-errors");

class AdminAuthorization {

  async isAdminAuthorized(userid){

    const confirm_admin = await Admin.findOne({ where : { uuid: userid }})
    if(!confirm_admin){
      throw Unauthorized('You are not authorized to access this resource')
    }

    if(confirm_admin && confirm_admin.type != 'admin'){
      throw Unauthorized('You are not authorized to perform this operation, kindly contact the admin for help.');
    }

  }

}

module.exports = new AdminAuthorization();