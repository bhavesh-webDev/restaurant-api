const userModel = require("../models/user.model");

const adminVerification = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.id);
    if (user.usertype !== "admin") {
      return res
        .status(401)
        .send({ message: "Only Admin Access...", success: false });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send({
      message: "Error in Admin Verification Middleware...",
      success: false,
      error: error.message,
    });
  }
};
module.exports = adminVerification;
