const express = require('express')
const { 
  listUsersValidation, viewUserValidation,
  updateMyAccountValidation, updateUserAccountValidation,
  userAccessValidation, addToCartValidation, placeOrderValidation
} = require('../helpers/validations/userValidations')
const { validator } = require("../middleware/validationMid");
const UserMgr = require('../controllers/User.mgmt.controller');
const MenuAcc = require('../controllers/User.activity.controller');
const { mustBeLoggedIn } = require('../helpers/authHelper');


const router = express.Router();


router.get('/users', mustBeLoggedIn, validator(listUsersValidation), UserMgr.listAllUsers);

router.get('/user/view', mustBeLoggedIn, validator(viewUserValidation), UserMgr.viewSingleUser);

router.patch("/update", mustBeLoggedIn, validator(updateMyAccountValidation), UserMgr.updateMyAccount);

router.patch('/user/update', mustBeLoggedIn, validator(updateUserAccountValidation), UserMgr.updateUserAccount);

router.delete('/user/delete', mustBeLoggedIn, validator(viewUserValidation), UserMgr.deleteUserAccount);


/*** MENU */
router.get('/list', MenuAcc.getAllMenus);

router.post('/cart/add', mustBeLoggedIn, validator(addToCartValidation), MenuAcc.populateCart);

router.get('/my-cart', mustBeLoggedIn, validator(userAccessValidation), MenuAcc.getUserCart);

router.post('/place-order', mustBeLoggedIn, validator(placeOrderValidation), MenuAcc.placeUserOrder)

router.get('/my-order', mustBeLoggedIn, validator(userAccessValidation), MenuAcc.getUserOrder)

module.exports = router;
