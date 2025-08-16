const express = require("express");
const { validUser } = require("../middlewares/auth.middleware");
const adminVerification = require("../middlewares/admin.middleware");
const {
  addFood,
  getAllFood,
  getFood,
  getFoodByRestaurant,
  updateFood,
  deleteFoodController,
  placeOrder,
  orderStatusController,
} = require("../controllers/foods.controller");
const Router = express.Router();

// Add food
Router.route("/addFood").post(validUser, addFood);
// getAllFood
Router.route("/getAllFood").get(validUser, getAllFood);

Router.route("/getFood/:id").get(validUser, getFood);

Router.route("/getRestaurantFood/:id").get(validUser, getFoodByRestaurant);

Router.route("/updateFood/:id").patch(validUser, updateFood);

Router.route("/deleteFood/:id").delete(validUser, deleteFoodController);

Router.route("/placeOrder").post(validUser, placeOrder);

Router.route("/orderStatus/:id").post(
  validUser,
  adminVerification,
  orderStatusController
);
module.exports = Router;
//  createFoodController,
//   getAllFoodsController,
//   getSingleFoodController,
//   getFoodByResturantController,
//   updateFoodController,
//   deleteFoodController,
//   placeOrderController,
// //   orderStatusController,
