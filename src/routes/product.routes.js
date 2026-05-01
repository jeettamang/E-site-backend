import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.js";

const productRouter = express.Router();

productRouter
  .post("/create", upload.single("image"), createProduct)
  .get("/get-all", getProducts)
  .get("/single/:id", getSingleProduct)
  .put("/update/:id", upload.single("image"), updateProduct)
  .delete("/delete/:id", deleteProduct);

export default productRouter;
