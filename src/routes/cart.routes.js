import express from "express";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
const cartRouter = express.Router();

cartRouter
  .post("/add", addToCart)
  .get("/get-all/:userId", getCart)
  .put("/update", updateCartItem)
  .delete("/remove", removeCartItem);

export default cartRouter;
