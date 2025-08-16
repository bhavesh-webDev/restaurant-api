const userModel = require("../models/user.model");
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: " User Not Found ", success: false });
    }
    res.status(200).send({
      message: "Successfully Fetched User...",
      success: true,
      fetchedUser: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Admins Get User API...",
      success: false,
      error: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      return res
        .status(400)
        .send({ message: "User Not Found...", success: false });
    }
    res.status(200).send({
      message: "successfully fetched all users ...",
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Admins Get All users API...",
      success: false,
      error: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, email, address, phone, answer } = req.body;
    const updates = {};
    if (userName) updates.userName = req.body.userName;
    if (email) updates.email = req.body.email;
    if (address) updates.address = req.body.address;
    if (phone) updates.phone = req.body.phone;
    if (answer) updates.answer = req.body.answer;

    //this runs for each loop on this array and assign available value to the user value
    const user = await userModel.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not Found to Update...", success: false });
    }

    res.status(200).send({
      message: "User Updated Successfully...",
      success: true,
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in Admins Update User API...",
      success: false,
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User Not Found to Delete... ", success: false });
    }
    res
      .status(200)
      .send({ message: "User Deleted successfully...", success: true });
  } catch (error) {
    res.status(500).send({
      message: "Error in Admins Delete User API...",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
};
