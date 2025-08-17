const asyncWrapper = require("../utils/js/AsyncWrapper");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = asyncWrapper(async (req, res) => {
  const {
    userName,
    password,
    email,
    address,
    phone,
    answer,
    usertype,
    profile,
  } = req.body;
  if (!userName || !password || !email || !address || !phone || !answer) {
    return res.status(500).json({
      status: 500,
      message: "please enter all required details",
      success: false,
    });
  }
  const existingUser = await userModel.findOne({ email });
  // hashing
  const saltRound = 10;
  const hasedPassword = bcrypt.hashSync(password, saltRound);
  if (existingUser) {
    return res.status(500).json({
      status: 500,
      message: "User Already Exist please login",
      success: false,
    });
  }
  try {
    const user = await userModel.create({
      userName,
      password: hasedPassword,
      email,
      address,
      phone,
      answer,
      usertype,
      profile,
    });
    res.status(201).send({
      status: 201,
      message: "Register Successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in register controller",
      success: false,
      error: error.message,
    });
  }
});

const loginController = asyncWrapper(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .send({
          status: 500,
          message: "Credentials Are Required...",
          success: false,
        });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ status: 404, message: "User Not Found ", success: false });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res
        .status(404)
        .send({ status: 404, message: "Invalid Credentials", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // console.log("token : ", token);
    const { password: _, ...safeUser } = user._doc; //Else use  ==> user.password = undefined;
    res
      // .cookie(token)
      .status(200)
      .send({
        status: 200,
        message: "login Success",
        success: true,
        user: safeUser,
        token,
      });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in login controller",
      success: false,
      error: error.message,
    });
  }
});
module.exports = {
  registerController,
  loginController,
};
