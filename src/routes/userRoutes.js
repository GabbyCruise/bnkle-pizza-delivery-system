const express = require('express')
const { 
  listUsersValidation, viewUserValidation,
  updateMyAccountValidation, updateUserAccountValidation
} = require('../helpers/validations/userValidations')
const { validator } = require("../middleware/validationMid");
const UserMgr = require('../controllers/User.mgmt.controller')


const router = express.Router();


router.get('/users', validator(listUsersValidation), UserMgr.listAllUsers);

router.get('/user/view', validator(viewUserValidation), UserMgr.viewSingleUser);

router.patch("/update", validator(updateMyAccountValidation), UserMgr.updateMyAccount);

router.patch('/user/update', validator(updateUserAccountValidation), UserMgr.updateUserAccount);

router.delete('/user/delete', validator(viewUserValidation), UserMgr.deleteUserAccount);


module.exports = router;
