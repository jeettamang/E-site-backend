// Core Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//  Local Imports
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";

dotenv.config();
const app = express();

//  Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["PUT", "POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  }),
);

// Routes (example)
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 7777;

//  Start Server AFTER DB Connection
const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  } catch (error) {
    console.error(" Database connection failed:", error);
    process.exit(1);
  }
};
startServer();
