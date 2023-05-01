/* eslint-disable no-console */
const dotenv = require("dotenv");
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const {users, menus, sequelize } = require('../models')
const AuthHelpers = require('./helpers/authHelper')

const authRoute = require("./routes/authRoutes");
const userMgtRoute = require("./routes/userRoutes");


const app = express();

// handle cors error
app.use(cors());

dotenv.config();


async function main(){
  
  const hash = await AuthHelpers.hashPassword('@superadminpassword');

  const menuData = [
    { type : 'smallie', name : "Sweet Marghie", price : 7000 },
    { type : 'smallie', name : "Chicky Pie", price : 1200 },
    { type : 'smallie', name : "Beefie Suya", price : 1000},
    { type : 'dessert', name : "Founders Favourites", price : 2000},
    { type : 'dessert', name : "Melted Choco Pocket", price : 1300},
    { type : 'dessert', name : "Lava Cakes", price : 1200},
    { type : 'chicken', name : "Chicken Kickers", price : 1600},
    { type : 'chicken', name : "Suya Wings", price : 1700},
    { type : 'specialty', name : "Meatzza", price : 3500},
    { type : 'specialty', name : "Shawarma Pizza", price : 3800}
  ];

  const adminData = {
    email: 'gjonah18@gmail.com',
    firstname: 'John', lastname : 'Doe',
    street : "The Epicentre, 1 Zilly Aggrey Drive, Karmo Abuja",
    password : hash, type : 'admin',
  }

  const duplicateAdmin = await users.findOne({ where : { email : adminData.email }});

  if(duplicateAdmin){
    await sequelize.authenticate()
    return console.log('database connected');
  }

  await users.create(adminData);
  await menus.bulkCreate(menuData);


  await sequelize.authenticate()
  console.log('database connected');
}
main()


app.get("/", (req, res) => res.status(200).json({
  status: true,
  message: "Server running"
}));


app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/accounts", userMgtRoute);

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

  // render error page
  res.status(err.status || 400);
  res.json({ error: err.message, message: "Operation failed" });
});

module.exports = app;
