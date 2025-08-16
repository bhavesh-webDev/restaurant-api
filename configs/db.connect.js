const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10s
  });
};
module.exports = connectDb;
