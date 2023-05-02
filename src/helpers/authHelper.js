/* eslint-disable class-methods-use-this */
require("dotenv").config();
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

class AuthHelpers {
  
  // handles password hacshing using bcrypt
  async hashPassword(plainPassword) {
    // checks if there is password provided
    if (!plainPassword) {
      throw new Error("Error hashing password");
    }

    // salt round which bcrypt will use
    const salt = bcrypt.genSaltSync(10);

    // return the generated hashed string
    return bcrypt.hashSync(plainPassword, salt);
  }

  // handles token generation
  async generateToken(payload) {
    return JWT.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "6h" });
  }

  
  async isPasswordValid(hashedPass, plainPass) {
    return bcrypt.compareSync(plainPass, hashedPass);
  }


  mustBeLoggedIn(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw Unauthorized("unauthorized access: Token not found");
      }
      // check if it is bearee token
      if (!token.split(" ")[0]) {
        throw Unauthorized("invalid token type: provide a Bearer token");
      }
      // get the plain token removing the bearer
      const authToken = req.headers.authorization.split(" ")[1];

      req.apiUser = JWT.verify(authToken, process.env.SECRET_ACCESS_TOKEN);

      // res.locals is guaranteed to hold state over the life of a request.
      res.locals.user = req.apiUser;

      next();
    } catch (error) {
      res.status(error.status || 500).json({
        status: false,
        message: "Sorry, you must provide a valid token.",
        error
      });
    }
  }
}

module.exports = new AuthHelpers();
