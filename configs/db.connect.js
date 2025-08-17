const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000, // 10s
  });
};
module.exports = connectDb;
