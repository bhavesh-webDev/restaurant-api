const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, " Food Name is required..."],
    },
    discription: {
      type: String,
      required: [true, " description is required..."],
    },
    price: {
      type: Number,
      required: [true, " Price is required..."],
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/hand-drawn-healthy-food-logo-template_23-2149653126.jpg?t=st=1754836170~exp=1754839770~hmac=4c4ac19606a85dbe2dbac1a9bf9edfb46abcc824947f37c6c418d8e2fbcde1be&w=2000",
    },
    foodTag: {
      type: Boolean,
      required: [true, " Food type is required..."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

const food = mongoose.model("food", foodSchema);
module.exports = food;
