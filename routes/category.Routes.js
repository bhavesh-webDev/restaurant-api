const express = require("express");
const Router = express.Router();
const {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");
const { validUser } = require("../middlewares/auth.middleware");

// create Category
Router.route("/create").post(validUser, createCategory);

//get all category
Router.route("/getAll").get(getAllCategory);

//update category
Router.route("/update/:id").patch(validUser, updateCategory);

// delete category
Router.route("/delete/:id").delete(validUser, deleteCategory);

module.exports = Router;
