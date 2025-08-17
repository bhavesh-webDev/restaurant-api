const foodModel = require("../models/food.model");
const ordelModel = require("../models/order.model");
const mongoose = require("mongoose");

const addFood = async (req, res) => {
  try {
    const {
      foodName,
      discription,
      price,
      imageUrl,
      foodTag,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!foodName || !discription || !price || !foodTag) {
      return res.status(400).send({
        status: 400,
        message: "All important fields are required",
        success: false,
      });
    }
    const addFood = new foodModel({
      foodName,
      discription,
      price,
      imageUrl,
      foodTag,
      category: new mongoose.Types.ObjectId(category),
      code,
      isAvailable,
      restaurant: new mongoose.Types.ObjectId(restaurant),
      rating,
      ratingCount,
    });

    await addFood.save();
    res.status(200).send({
      status: 200,
      message: "Food Added Successfully ",
      success: true,
      addedFood: addFood,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: " Error in add Food API...",
      success: false,
      error: error.message,
    });
  }
};
const getAllFood = async (req, res) => {
  try {
    const food = await foodModel.find();
    if (!food) {
      return res
        .status(404)
        .send({ status: 404, message: "Food not found...", success: false });
    }
    res.status(200).send({
      status: 200,
      message: "Get all food Successfully...",
      success: true,
      AllFood: food,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Get All food API ...",
      success: true,
      error: error.message,
    });
  }
};
const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodModel.findById({ _id: id });
    if (!food) {
      return res
        .status(404)
        .send({ status: 404, message: "Food Not Found...", success: false });
    }
    res
      .status(200)
      .send({
        status: 200,
        message: "Getting Food Successfull",
        success: true,
        Food: food,
      });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Get Food API...",
      success: false,
      error: error.message,
    });
  }
};
const getFoodByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res
        .status(404)
        .send({
          status: 404,
          message: " Provide Restaurant Id ",
          success: false,
        });
    }

    const foods = await foodModel.find({ restaurant: restaurantId });
    if (!foods) {
      return res
        .status(404)
        .send({
          status: 404,
          message: "No food Found in restaurant ...",
          success: false,
        });
    }
    res.status(200).send({
      status: 200,
      message: "successfully fetched food from restaurant ...",
      success: true,
      restaurantFood: foods,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Get Food By Restaurant API ",
      success: false,
      error: error.message,
    });
  }
};
const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ status: 404, message: "Food id not found...", success: false });
    }

    const food = await foodModel.findById({ _id: foodId });
    if (!food) {
      return res
        .status(404)
        .send({ status: 404, message: "Food Not Found...", success: false });
    }
    const { foodName, discription, price, foodTag, category, isAvailable } =
      req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      food,
      { foodName, discription, price, foodTag, category, isAvailable },
      { new: true }
    );

    res.status(200).send({
      status: 200,
      message: "Food Updated Successfully...",
      success: true,
      updatedFood: updatedFood,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Update Food API...",
      success: false,
      error: error.message,
    });
  }
};
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res
        .status(404)
        .send({ status: 404, message: "Food Id Not Found...", success: false });
    }
    const food = await foodModel.findByIdAndDelete(foodId);
    if (!food) {
      return res
        .status(404)
        .send({ status: 404, message: "Food not Found...", success: false });
    }
    res.status(200).send({
      status: 200,
      message: "Food Deleted Successfully...",
      success: true,
      deletedFood: food,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Delete Food API...",
      success: false,
      error: error.message,
    });
  }
};

// order controller
const placeOrder = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart || !payment) {
      return res.status(404).send({
        status: 404,
        message: "Cart Empty or Payment not selected ...",
        success: false,
      });
    }
    console.log("place order", req.body);
    let total = 0;
    cart.map((i) => {
      // console.log("CART : ", cart);
      // console.log("i : ", i);
      total += i.price;
    });
    const newOrder = new ordelModel({
      foods: cart,
      payment,
      buyer: req.id,
    });
    await newOrder.save();
    res.status(200).send({
      status: 200,
      message: "Order Placed Successfully...",
      success: true,
      newOrder: newOrder,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Place order API...",
      success: false,
      error: error.message,
    });
  }
};

//change Order Status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res
        .status(404)
        .send({
          status: 404,
          message: "Order Id Not Found ...",
          success: false,
        });
    }
    const { status } = req.body;
    const orderStatus = await ordelModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      status: 200,
      message: "Order Status updated Successfully ...",
      success: true,
      orderStatus: orderStatus,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Order Status Controller ...",
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  addFood,
  getAllFood,
  getFood,
  getFoodByRestaurant,
  updateFood,
  deleteFoodController,
  placeOrder,
  orderStatusController,
};
