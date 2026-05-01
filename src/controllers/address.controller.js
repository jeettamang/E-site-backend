import { AddressModel } from "../models/address.model.js";

const saveAddress = async (req, res) => {
  try {
    const { userId, fullName, phone, addressLine, city, pincode } = req.body;

    const newAddress = await AddressModel.create({
      userId,
      fullName,
      phone,
      addressLine,
      city,
      pincode,
    });
    res.status(200).json({
      message: "Address saved",
      address: newAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error saving address",
      error,
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const {userId} = req.params
    const addresses = await AddressModel.find({ userId });

    res.status(200).json(addresses);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting address",
      error,
    });
  }
};

export { saveAddress, getAddresses };
