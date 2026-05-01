import mongoose, { Schema } from "mongoose";
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type:String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 300,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model("Product", productSchema);
