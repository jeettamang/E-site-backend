import { UserModel } from "../models/user.model.js";
import {
  comparePassword,
  generateToken,
  hashedPassword,
} from "../utils/bcrypt_jwt.js";

const signUpUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPass = await hashedPassword(password);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPass,
      role,
    });
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal sercer error during signUp",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = generateToken(user);

    const updatedUser = await UserModel.findById(user._id).select("-password");
    res
      .status(200)
      .json({
        success: true,
        message: "User login successful",
        updatedUser,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during login",
      error: error.message,
    });
  }
};
export { signUpUser, loginUser };
