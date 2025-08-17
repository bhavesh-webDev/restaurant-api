// const redirectHome = (req,res)=>{
//   res.redirect("/home");
// }
const homeController = (req, res) => {
  res.send({
    message:
      " THIS IS A HOME FOR RESTAURANT API - THIS API CONTAINS MANY FEATURES MODELS ROUTES - TO KNOW MORE VISIT --  /info  -- Route ",
  });
};
const infoController = (req, res) => {
  res.send({
    status: 200,
    message:
      "THIS API OFFER DIFFERENT -- ROUTES -- AND -- FUNCTIONALITY-- THIS CAN BE USED AS A COMPLETE BACKEND ",
    routes:
      " ADMIN , CATEGORY , AUTH , FOOD  , HOME , RESTAURANT , USER --- TO FIND MORE DETAILS ABOUT THIS ROUTES VISIT -- /home/ROUTE NAME --",
    funtionality:
      " IT PROVIDES FUNCTIONALITY LIKE CRUD OPERATIONS , AUTHENTICATION , AUTHERIZATION ",
  });
};
const homeAdmin = (req, res) => {
  res.send({
    message: "THIS IS HOME ADMIN INFORMATION",
    routesInAdmin: {
      "/getAllUsers":
        " FUNCTIONALITY : THIS ROUTES WILL REFLECT ALL THE AVAILABLE USERS. IN THE DATABASE",
      "/updateUser/:id":
        "FUNCTIONALITY : THIS ROUTE WILL UPDATE USERS DATA [userName, email, address, phone, answer] BASED ON USER ID ",
      "/deleteUser/:id":
        " FUNCTIONALITY : THIS ROUTE WILL DELETE THE FOLLOWING USER BASED ON USER ID ",
      "/getUser/:id":
        " FUCTIONALITY : THIS ROUTE WILL FETCH A SPECIFIC USER BASED ON USER ID ",
    },
    NOTE: " THIS ROUTES WILL ONLY WORK IF THE USER IS LOGGED IN AS ADMIN",
  });
};

const homeAuth = (req, res) => {
  res.send({
    message: "THIS IS USED FOR REGISTER AND LOGIN FUNCTIONALITY ",
    routes: {
      "/auth/register ": " FUNCTIONALITY : THIS ROUTE IS FOR USER REGISTER ",
      "/auth/login ": " FUNCTIONALITY : THIS ROUTE IS USED TO LOGIN USER ",
    },
  });
};

const homeCategory = (req, res) => {
  res.send({
    routes: {
      "/create": " FUNCTIONALITY : THIS ROUTES IS USED TO CREATE A CATEGORY ",
      "/getAll":
        "FUNCTIONALITY : THIS ROUTES IS USED TO GET ALL THE CATEGORY AVAILABLE IN THE DATABASE ",
      "/update/:id":
        " FUNCTIONALITY : THIS ROUTE IS USED TO UPDATE A SPECIFIC CATEGORY BASED ON CATEGORY ID",
      "/delete/:id":
        " FUNCTIONSLITY : THIS ROUTE IS USED TO DELETE A SPECIFIC CATEGORY BASED ON CATEGORY ID ",
    },
    NOTE: " THIS ROUTES ONLY WORK IF THE THE USER IS LOGGED IN ",
  });
};
const homeFood = (req, res) => {
  res.send({
    message: " THIS ROUTES ARE USED PERFORMING OPERATION ON FOOD DB ",
    routes: {
      "/addFood":
        " FUNCTIONALITY : THIS ROUTE IS USED TO ADD FOOD BY THE RESTAURANT ",
      "/getAllFood":
        " FUNCTIONALITY : THIS ROUTE IS USED TO GET ALL THE FOOD FROM THE RESTAURANTS",
      "/getFood/:id":
        " FUNCTIONALITY : THIS ROUTE IS USED TO GET ALL THE FOOD ",
      "/getRestaurantFood/:id":
        " FUNCTIONALITY : THIS ROUTE IS USED TO GET ALL THE FOOD OF A RESTAURANT BASED ON RESTAURANT ID  ",
      "/updateFood/:id":
        " FUNCTIONALITY : THIS ROUTE IS USED TO UPDATE FOOD OF RESTAURANT BASED ON FOOD ID ",
      "/deleteFood/:id":
        " FUNCTIONALITY : THIS ROUTE IS USED TO DELETE A SPECIFIC FOOD ",
      "/placeOrder": " FUNCTIONALITY : THIS ROUTE IS USED TO PLACE ORDER ",
      "/orderStatus/:id": " FUNCTIONALITY : THIS ROUTE IS USED TO TRACK ORDER",
    },
  });
};
const homeRestaurant = (req, res) => {
  res.send({
    message: " THIS IS A RESTAURANT ROUTE ",
    routes: {
      "/create": " FUNCTIONALITY : THIS ROUTE IS USED TO CREATE A RESTAURANT ",
      "/getAll":
        " FUNCTIONALITY : THIS ROUTE IS USED TO GET ALL THE RESTAURANT ",
      "/getRestaurant/:id":
        " FUNCTIONALITY : THIS ROUTE IS USED TO GET RESTAURANT BASE ON RESTAURANT ID  ",
      "/delete/:id":
        " FUNCTIONALITY : THIS ROUTE IS USED TO DELETE A RESTAUTANT  ",
    },
  });
};
const homeUser = (req, res) => {
  res.send({
    message: " THIS ROUTE IS PERFORM OPERATION ON USER",
    routes: {
      "/getUser": "FUNCTIONALITY : THIS ROUTE IS USED TO GET USERS",
      "/updateUser/:id":
        "FUNCTIONALITY : THIS ROUTE IS USED TO UPDATE A USER BASED ON USER ID ",
      "/updatePassword/:id":
        "FUNCTIONALITY : THIS ROUTE IS USED TO UPDATE PASSWORD IT WORKS IF THE USER ALREADY KNOWS THE OLD PASSWORD",
      "/resetPassword":
        "FUNCTIONALITY : THIS ROUTE IS USED TO RESET THE PASSWORD IT TAKES 3 ARGUEMENTS  EMAIL , ANSWER [ HINT ] ,NEWPASSWORD",
      "/deleteUser/:id":
        "FUNCTIONALITY : THIS ROUTE IS USED TO DELETE A PECIFIC USER",
    },
  });
};
module.exports = {
  homeController,
  infoController,
  homeAdmin,
  homeAuth,
  homeCategory,
  homeFood,
  homeRestaurant,
  homeUser,
};
