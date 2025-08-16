const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user.Routes");
const authRoute = require("./routes/auth.Routes");
const restaurantRoute = require("./routes/restaurant.Routes");
const categoryRoute = require("./routes/category.Routes");
const foodRoute = require("./routes/food.routes");
const adminRoute = require("./routes/admin.Routes");
const connectDb = require("./configs/db.connect");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");

const PORT = 5001 || process.env.PORT;
// middlewares
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/restaurant", restaurantRoute);
app.use("/category", categoryRoute);
app.use("/food", foodRoute);
app.use("/admin", adminRoute);

//Db connection
connectDb()
  .then(() => {
    console.log("connected Successfully", mongoose.connection.host);
  })
  .catch((error) => {
    console.log("Error : ", error);
  });
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
