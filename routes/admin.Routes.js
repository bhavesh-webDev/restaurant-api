const express = require("express");
const Router = express.Router();
const { validUser } = require("../middlewares/auth.middleware");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/admin.controller");
const adminVerification = require("../middlewares/admin.middleware");

// Router.route("/dashboard").get()
Router.route("/getAllUsers").get(validUser, adminVerification, getAllUsers);

Router.route("/updateUser/:id").put(validUser, adminVerification, updateUser);

Router.route("/deleteUser/:id").delete(
  validUser,
  adminVerification,
  deleteUser
);

Router.route("/getUser/:id").get(validUser, adminVerification, getUser);

module.exports = Router;
