/* eslint-disable no-console */
const dotenv = require("dotenv");
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const {admins, sequelize } = require('../models')
const AuthHelpers = require('./helpers/authHelper')


const app = express();

// handle cors error
app.use(cors());

dotenv.config();

// set up route here
const authRoute = require("./routes/authRoutes");
// const calculatorRoute = require("./routes/calculator");
// const publicRoute = require('./routes/accessRoutes');

// hash password
const adminPass = '@superadminpassword'
async function main(){
  const hash = await AuthHelpers.hashPassword(adminPass);

  // await sequelize.sync({ force: true }).then(() => {
  //   // Create default superadmin account
    
  //   admins.create({ firstname: "Super", lastname: "Admin User", type: 'superadmin', email: 'superadmin@gmail.com', password: hash, privileges: [] });
  // });
  // console.log('database synced!')

  await sequelize.authenticate()
  console.log('database connected');
}
main()


app.get("/", (req, res) => res.status(200).json({
  status: true,
  message: "Server running"
}));

// make use of morgan
app.use(logger("dev"));
// allow collection of payload from body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/calculate", calculatorRoute);
// app.use("/api/v1/resources", publicRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({ error: err.message, message: "Operation failed" });
});

module.exports = app;
