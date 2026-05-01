import { ProductModel } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path";

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, brand } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, price and category are required",
      });
    }
    let imageUrl = "";

    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);

      imageUrl = uploaded.secure_url;
    }
    const newProduct = await ProductModel.create({
      title,
      price,
      description,
      category,
      stock,
      brand,
      image: imageUrl,
    });
    res.status(200).json({
      success: true,
      message: "Products created successfully",
      newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during product",
      error,
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category && category !== "undefined" && category !== "") {
      filter.category = category;
    }
    const products = await ProductModel.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      message: "Products list",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Id is required",
      });
    }
    const product = await ProductModel.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.messaage,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      updateData.image = uploaded.secure_url; // save image URL
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleteProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
