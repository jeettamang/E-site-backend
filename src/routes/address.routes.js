import express from "express";
import {
  getAddresses,
  saveAddress,
} from "../controllers/address.controller.js";
const addressRouter = express.Router();

addressRouter.post("/save", saveAddress);
addressRouter.get("/:userId", getAddresses);

export default addressRouter;
