const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title for Category is Required..."],
    },
    imageUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20220628/original/pngtree-food-logo-png-image_8239850.png",
    },
  },

  { timestamps: true }
);

const category = mongoose.model("category", categorySchema);

module.exports = category;
