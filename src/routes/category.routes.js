import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
const categoryRouter = express.Router();

categoryRouter
  .post("/create", createCategory)
  .get("/get-all", getCategories)
  .get("/single/:id", getCategoryById)
  .put("/update/:id", updateCategory)
  .delete("/delete/:id", deleteCategory);

export default categoryRouter;
