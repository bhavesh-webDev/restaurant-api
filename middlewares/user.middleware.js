const userModel = require("../models/user.model");

const notRestaurant = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.id);
    if (user.usertype !== "restaurant" && user.usertype !== "admin") {
      return res.status(400).send({
        status: 400,
        message: "Un-Authorized Access",
        success: false,
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in not restaurant middleware",
      success: false,
      error: error.message,
    });
  }
};

module.exports = notRestaurant;
