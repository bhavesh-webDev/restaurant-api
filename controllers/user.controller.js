const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.id }); //can also do {_id:0} to hide id
    if (!user) {
      return res.status(404).json({
        message: "User Not Found or Something Went Wrong",
        success: false,
      });
    }
    const { password: _, ...safeUser } = user._doc; //Else use  ==> user.password = undefined;
    res.status(200).send({
      message: "Get User Data Successfull",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in Get User Controller ", success: false });
  }
};
const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.id !== id) {
      return res
        .status(500)
        .send({ message: "cannot update others Account ", success: false });
    }
    const user = await userModel.findById({ _id: req.id });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not Found ", success: false });
    }
    const { userName, address, phone } = req.body;
    // console.log("REQ : ", req);
    // console.log("Req BODY : ", req.body);
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    res
      .status(200)
      .send({ message: "User Updated Successfully ", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in Api Update User Controller", success: false });
  }
};

// step1 : find users ✅
// step 2 : take old and new password from user as input ✅
// step 3 : check if provided old password matches the old password ✅
// step 4 : if old password matches hash the new password and store it in database

//update password is for is users knows the oldpassword user can update the password
// reset password is if the users doesnt know the old password he can still reset the password on the basis of email and ans

const updatePassword = async (req, res) => {
  const id = req.params.id;
  if (req.id !== id) {
    return res
      .status(500)
      .send({ message: "cannot update others password ", success: false });
  }
  const user = await userModel.find({ _id: id });
  if (!user) {
    return res.status(404).send({ message: "User Not Found", success: false });
  }

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(500).send({
      message: "Old Password And New Password is Required",
      success: false,
    });
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(500).send({
      message: "Provided Old Password does not match",
      success: false,
    });
  }
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  user.password = hashedPassword;
  await user.save();
  res.status(200).send({
    message: "updated Password Successfully",
    success: true,
    user: user,
  });
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !newPassword || !answer) {
      res.status(400).send({
        message: "Email and Answer is Required ",
        success: false,
      });
    }
    const user = await userModel.findOne({ email }); // user object {}
    // console.log(user);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not Found ", success: false });
    }

    if (req.body.answer !== user.answer && req.body.email !== user.email) {
      return res
        .status(500)
        .send({ message: "Answer does not match", success: false });
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    // console.log("HAshed : ", hashedPassword);

    user.password = hashedPassword;
    // console.log("USER PASS : ", user.password);
    await user.save();
    res.status(200).send({
      message: "Password Reset Successfull",
      success: true,
      user: user,
    });
    // const decode = jwt.
  } catch (error) {
    res.status(500).send({
      message: "Error in Reset Password Controller",
      success: false,
      error: error.message,
    });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    // console.log(req);
    const { id } = req.params.id;
    if (req.id !== id) {
      return res
        .status(500)
        .send({ message: "cannot delete others Account ", success: false });
    }
    const user = await userModel.findByIdAndDelete(id);
    console.log("USER : ", user);

    if (!user) {
      return res.status(404).send({
        message: "user not found to delete ",
        success: false,
      });
    }
    res
      .status(200)
      .send({ message: "user Deleted successfully", success: true });
  } catch (error) {
    res.status(500).send({
      message: "Error in delete api ",
      error: error.message,
      success: false,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePassword,
  resetPasswordController,
  deleteUserProfile,
};
