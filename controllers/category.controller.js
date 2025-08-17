const categoryModel = require("../models/category.model");
const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        status: 500,
        message: "Title is Required... ",
        success: false,
      });
    }
    const createNewCategory = new categoryModel({
      title,
      imageUrl,
    });
    if (!createNewCategory) {
      return res
        .status(500)
        .send({
          status: 500,
          message: "Error in creating Category...",
          success: false,
        });
    }
    await createNewCategory.save();
    res.status(200).send({
      status: 200,
      message: "Category created Successfully... ",
      success: true,
      createdCategory: createNewCategory,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in  Create Category API...",
      success: false,
      error: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await categoryModel.find();
    if (!allCategory) {
      return res.status(404).send({
        status: 404,
        message: "No category Found...",
        success: false,
      });
    }
    res.status(200).send({
      status: 200,
      message: " Get all category successfull",
      success: true,
      allCategory: allCategory,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Get All Category API...",
      success: false,
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete({ _id: id });
    if (!category) {
      return res
        .status(404)
        .send({ status: 404, message: "No category Found...", success: false });
    }
    res.status(200).send({
      status: 200,
      message: "Category Deleted Successfully...",
      success: true,
      category: category,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Delete Category API...",
      success: false,
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, imageUrl } = req.body;
    const UpdatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        title,
        imageUrl,
      },
      { new: true }
    );
    // this line no 91 {new :true} sends new data [updated data] when sending the
    if (!UpdatedCategory) {
      return res
        .status(500)
        .send({
          status: 500,
          message: "Category not found to update ...",
          success: false,
        });
    }
    res.status(200).send({
      status: 200,
      message: "Category updated successfully ...",
      success: true,
      updatedcategory: UpdatedCategory,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Error in Update Category API...",
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
