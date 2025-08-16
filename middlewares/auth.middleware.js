const jwt = require("jsonwebtoken");

const validUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .send({ message: "token not found", success: false });
    }
    // console.log("AUTH TOKEN : ", token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      // console.log("DECODE : ", decode.id);

      if (err) {
        res.status(401).send({
          success: false,
          message: "Un-Authorized User",
          error: err.message,
        });
      } else {
        req.id = decode.id;
        console.log("REQ BODY ID", req.id);

        next();
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in auth api", success: false, error });
  }
};
module.exports = {
  validUser,
};
// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     // get token
//     const token = req.headers["authorization"].split(" ")[1];
//     console.log("token", token);
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Un-Authorize User",
//         });
//       } else {
//         req.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Please provide Auth Token",
//       error,
//     });
//   }
// };
