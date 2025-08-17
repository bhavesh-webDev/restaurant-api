const restaurantModel = require("../models/restaurant.model");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        status: 500,
        message: "Title And Address Co-ords Required..",
        success: false,
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      coords,
    });
    newRestaurant.save();
    res.status(200).send({
      status: 200,
      message: "Restaurant Created Successfully...",
      success: true,
      newRestaurant: newRestaurant,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Restaurant creating API..",
      success: false,
      error: error.message,
    });
  }
};
const getAllRestaurant = async (req, res) => {
  try {
    const allRestaurants = await restaurantModel.find();
    if (!allRestaurants) {
      return res
        .status(404)
        .send({
          status: 404,
          message: "NO Restaurant Found...",
          success: false,
        });
    }
    res.status(200).send({
      status: 200,
      restaurants: allRestaurants,
      message: "All restaurant get Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in get all restaurant API ...",
      success: false,
      error: error.message,
    });
  }
};
const getSingleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.find({ _id: id });
    console.log(restaurant);
    if (!restaurant) {
      return res
        .status(404)
        .send({
          status: 404,
          message: "Restaurant not Found...",
          success: false,
        });
    }
    res.status(200).send({
      status: 200,
      message: "Getting Single Restaurant Successfully",
      success: true,
      restaurants: restaurant,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Get Single Restaurant API...",
      success: false,
      error: error.message,
    });
  }
};
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .send({ status: 404, message: "Provide Proper ID...", success: false });
    }
    const restaurant = await restaurantModel.findByIdAndDelete({ _id: id });

    if (!restaurant) {
      return res
        .status(404)
        .send({
          status: 404,
          message: "Restaurant Not Found...",
          success: false,
        });
    }
    res.status(200).send({
      status: 200,
      message: "Restaurant Deleted Successfully ...",
      success: true,
      restaurant: restaurant,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in DELETE Restaurant API...",
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  createRestaurantController,
  getAllRestaurant,
  getSingleRestaurant,
  deleteRestaurant,
};
