const express = require("express");
const {
  homeController,
  infoController,
  homeAdmin,
  homeAuth,
  homeCategory,
  homeFood,
  homeRestaurant,
  homeUser,
} = require("../controllers/home.controller");
const Router = express.Router();

Router.route("/").get(homeController);
Router.route("/info").get(infoController);
Router.route("/admin").get(homeAdmin);
Router.route("/auth").get(homeAuth);
Router.route("/category").get(homeCategory);
Router.route("/food").get(homeFood);
Router.route("/restaurants").get(homeRestaurant);
Router.route("/user").get(homeUser);
module.exports = Router;
