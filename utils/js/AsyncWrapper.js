const asyncWrapper = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
};

module.exports = asyncWrapper;
