const express = require("express");
const Router = express.Router();
const {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");
const { validUser } = require("../middlewares/auth.middleware");
const notRestaurant = require("../middlewares/user.middleware");

// create Category
Router.route("/create").post(validUser, notRestaurant, createCategory);

//get all category
Router.route("/getAll").get(getAllCategory);

//update category
Router.route("/update/:id").patch(validUser, notRestaurant, updateCategory);

// delete category
Router.route("/delete/:id").delete(validUser, notRestaurant, deleteCategory);

module.exports = Router;
