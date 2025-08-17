const express = require("express");
const Router = express.Router();
const { validUser } = require("../middlewares/auth.middleware");
const {
  createRestaurantController,
  getAllRestaurant,
  getSingleRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant.controller");

//Add new Restaurant
Router.route("/create").post(validUser, createRestaurantController);

//Get All Restaurants
Router.route("/getAll").get(getAllRestaurant);

//Get Restaurant By Id
Router.route("/getRestaurant/:id").get(getSingleRestaurant);

// Delete Restaurant By ID
Router.route("/delete/:id").delete(validUser, deleteRestaurant);

module.exports = Router;
