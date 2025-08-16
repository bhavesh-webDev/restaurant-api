const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

const Router = express.Router();

const {} = require("../controllers/auth.controller");

Router.route("/register").post(registerController);
Router.route("/login").post(loginController);

module.exports = Router;
