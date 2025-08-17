const express = require("express");
const Router = express.Router();
const { validUser } = require("../middlewares/auth.middleware");

const {
  getUserController,
  updateUserController,
  updatePassword,
  resetPasswordController,
  deleteUserProfile,
} = require("../controllers/user.controller");

// get user data
Router.route("/getUser").get(validUser, getUserController);

// update user data
Router.route("/updateUser/:id").put(validUser, updateUserController);

// update User Password
// update password is for is users knows the oldpassword user can update the password
Router.route("/updatePassword/:id").post(validUser, updatePassword);

// reset password route
// reset password is if the users doesnt know the old password he can still reset the password on the basis of email and ans
Router.route("/resetPassword").post(validUser, resetPasswordController);
//delete User profile

Router.route("/deleteUser/:id").delete(validUser, deleteUserProfile);
module.exports = Router;
