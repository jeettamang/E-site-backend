import mongoose, { Schema } from "mongoose";
const addressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    pincode: String,
  },
  { timestamps: true },
);
export const AddressModel = mongoose.model("Address", addressSchema);
