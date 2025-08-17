const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName Required To Move Forward"],
    },
    password: {
      type: String,
      required: [true, "Password Is Required ! "],
    },
    email: {
      type: String,
      required: [true, "email is Required : "],
      unique: true,
    },
    address: {
      type: Array,
    },
    phone: {
      type: Number,
      required: [true, "password is Required"],
    },
    usertype: {
      type: String,
      default: "user",
      required: [true, "User Type is Required"],
      enum: ["user", "admin", "restaurant", "driver"],
    },
    profile: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    answer: {
      type: String,
      required: [true, "Answer is required : "],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
